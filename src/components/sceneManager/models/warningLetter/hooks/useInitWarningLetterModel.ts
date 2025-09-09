'use client'

import { useEffect, useRef } from "react";
import { WarningLetterModelProps } from "../warningLetterModel";
import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { ShadowGenerator, TransformNode, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

export function useInitWarningLetterModel(pos: Vector3, scale: Vector3) {

    const canvasContext = useCanvasContext();
    const mounted = useRef(false);  
    

    const init =  async () => {
        if(mounted.current) return;
        mounted.current = true;
        const assetsManager = canvasContext.assetsManager!;

        const task = assetsManager.addMeshTask('warningLetter task', '', '', '/warningLetter.glb');

        task.onSuccess = t => {

            const root = t.loadedMeshes[0];
            
            const control = new TransformNode("warningLetter", canvasContext.scene!);
            const meshes = root.getChildMeshes();
            const lights = canvasContext.scene?.lights || [];
            meshes.forEach(m => {
                m.setParent(control);
                m.isPickable = false;

                lights.forEach(light => {
                    const sg = light.getShadowGenerator() as ShadowGenerator;
                    if(sg) sg.addShadowCaster(m);
                });
            });
            
            control.position.copyFrom(pos);
            
            control.scaling.copyFrom(new Vector3(-scale.x, scale.y, -scale.z));
            root.dispose();


            canvasContext.setModels({ ...canvasContext.models, warningLetter: control });

        }
        task.onError = (t, message, exception) => {
            console.error('error loading warningLetter', message, exception);
        }

        assetsManager.load();
    }
    

    useEffect(() => {

        if(
            canvasContext?.scene && canvasContext?.assetsManager && !canvasContext.models?.warningLetter) {
            init();
        }

        return() =>{
           
            if(canvasContext.models?.warningLetter){
                canvasContext.models.warningLetter.dispose();
                canvasContext.setModels({...canvasContext.models, warningLetter: undefined});
            }
        }

    }, [canvasContext]);

}