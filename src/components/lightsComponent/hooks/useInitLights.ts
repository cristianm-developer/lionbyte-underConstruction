import { ICanvasContext } from "@/context/canvasContext/canvasContext";
import { Color3, LightGizmo, PointLight, ShadowGenerator, SpotLight, Vector3 } from "@babylonjs/core";
import { useEffect } from "react";


export function useInitLights(canvasContext: ICanvasContext, setMounted?: React.Dispatch<React.SetStateAction<boolean>>) {

    let lightRight: PointLight;
    let lightLeft: PointLight;
    const debug = process.env.NODE_ENV === 'development';

    const createLightRight = () => {

        const light = new PointLight("lightRight", new Vector3(5, 5, -4), canvasContext.scene!);
        light.diffuse = new Color3(1, 1, 1);
        light.specular = new Color3(1, 1, 1);
        light.intensity = .7;

        const shadowGenerator = new ShadowGenerator(512, light);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;
        shadowGenerator.setDarkness(0.5);
        shadowGenerator.filter = ShadowGenerator.FILTER_PCF;



        if(debug) {
            const lightHelper = new LightGizmo();
            lightHelper.light = light;
        }

        return  light;
    }

    const createLightLeft = () => {
        const light = new PointLight('lightLeft', new Vector3(-5, -5, 0), canvasContext.scene!);
        light.diffuse = new Color3(1, 1, 1);
        light.specular = new Color3(1, 1, 1);
        light.intensity = .6;

        const shadowGenerator = new ShadowGenerator(512, light);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;
        shadowGenerator.setDarkness(0.5);
        shadowGenerator.filter = ShadowGenerator.FILTER_PCF;

        if(debug){
            const lightHelper = new LightGizmo();
            lightHelper.light = light;
        }

        return light;
    }

    const init = () => {
        if(!canvasContext.scene) return;

        lightRight = createLightRight();
        lightLeft = createLightLeft();


        setMounted?.(true);

        return () => {
            lightRight.dispose();
        }
    }

    useEffect(() => {
        init();
    }, [canvasContext.scene]);


}