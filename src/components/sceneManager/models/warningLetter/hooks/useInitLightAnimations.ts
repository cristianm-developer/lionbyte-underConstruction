import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { Animation, AnimationGroup, Color3, LightGizmo, PointLight, StandardMaterial, Vector, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";


export function useInitLightAnimations(pos: Vector3) {

    const canvasContext = useCanvasContext();
    const mounted = useRef(false);

    const init = () => {
        mounted.current = true;

        const {scene} = canvasContext;
        
        const [ redMaterial, yellowMaterial ] = Object.values(getMaterials());
        yellowMaterial.emissiveColor = new Color3(0,0,0);

    }

    const createAnimation = (color: 'red' | 'yellow') => {
        const fps = process.env.NEXT_PUBLIC_FPS ? parseInt(process.env.NEXT_PUBLIC_FPS) : 30;

        const animationMaterial = new Animation("materialAnimation",  "emissiveColor", fps, Animation.ANIMATIONTYPE_COLOR3, Animation.ANIMATIONLOOPMODE_CYCLE);

        animationMaterial.setKeys([
            {frame: 0 , value: color === 'red' ? new Color3(0,0,0) : new Color3(1,1,0)},
            {frame: fps/2 , value: color === 'red' ? new Color3(1,0,0) : new Color3(0,0,0)},
            {frame: fps , value: color === 'red' ? new Color3(0,0,0) : new Color3(1,1,0)},
        ])

        return animationMaterial;
    }

    const createLight = () => {
        const {scene} = canvasContext;
        const offsetX = 6.1
        const offsetY = 1;
        const offsetZ = -1

        const lightsRed = {
            light1: new PointLight('warningLightRed1', pos.add(new Vector3(-offsetX, offsetY, offsetZ)), scene!),
            light2: new PointLight('warningLightRed2', pos.add(new Vector3(offsetX, offsetY, offsetZ)), scene!),
        }

        Object.values(lightsRed).forEach(light => {
            light.intensity = 1;
            light.specular = new Color3(1,0,0);
            light.diffuse = new Color3(1,0,0);
         
            if(process.env.NODE_ENV === 'development'){
                const gizmo = new LightGizmo();
                gizmo.light = light;
            }

        });

        const lightsYellow = {
            light1: new PointLight('warningLightYellow1', pos.add(new Vector3(-offsetX, -offsetY, offsetZ)), scene!),
            light2: new PointLight('warningLightYellow2', pos.add(new Vector3(offsetX, -offsetY, offsetZ)), scene!),
        }

        Object.values(lightsYellow).forEach(light => { 
            light.intensity = 1;
            light.specular = new Color3(1,1,0);
            light.diffuse = new Color3(1,1,0);

            if(process.env.NODE_ENV === 'development'){
                const gizmo = new LightGizmo();
                gizmo.light = light;
            }
        });




        return [null, null];
    }

    const getMaterials = () => {
        const {scene} = canvasContext;
        
        const red = scene?.getMaterialByName("warning_letter_l_red_emissive_material") as StandardMaterial;
        const yellow = scene?.getMaterialByName("warning_letter_l_yellow_emissive_material") as StandardMaterial;

        return [red, yellow];
        
    }
    

    useEffect(() => {
        if(!canvasContext.models?.warningLetter || mounted.current)
            return;

        init();
    }, [canvasContext]);

}