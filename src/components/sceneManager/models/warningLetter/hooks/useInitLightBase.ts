import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { Color3, Color4, LightGizmo, RectAreaLight, Tools, TransformNode, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { WarningLetterModelProps } from "../warningLetterModel";

export function useInitLightBase(props: WarningLetterModelProps) {
    const canvasContext = useCanvasContext();
    const mounted = useRef(false);
    const {position, rotation, scale} = props;
    const init = () => {
        mounted.current = true;
        const light = new RectAreaLight("warningLightBase", new Vector3(0, 0, 0), 5, 3, canvasContext.scene!);
        light.intensity = 0.2;
        light.diffuse = new Color3(1, 0, 0);
        light.specular = new Color3((219/255), (214/255), (28/255));

        const control = new TransformNode("warningLetterLightControl", canvasContext.scene!);
        light.parent = control;

        if(process.env.NODE_ENV === 'development'){
            const helper = new LightGizmo();
            helper.light = light;
        }

        control.position.copyFrom(new Vector3(position.x, position.y, -5));
        control.rotation = new Vector3(Tools.ToRadians(180) ,0,0);
        
        

    }

    useEffect(() => {
        if (!canvasContext.scene ) return;
        if(mounted.current) return;
        const lightExists = canvasContext.scene.lights.find(l => l.name === "warningLightBase");
        if (lightExists) return;
        init();
    }, [canvasContext]);

}