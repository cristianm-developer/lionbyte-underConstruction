'use client';

import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { ShadowGenerator, TransformNode, Vector3 } from "@babylonjs/core";
import { useEffect } from "react";
import "@babylonjs/loaders/glTF";


export function useLoadLogo(pos: Vector3, scale: Vector3) {
  const canvasContext = useCanvasContext(); 

    const load = () => {
        const assetsManager = canvasContext!.assetsManager!;

        const task = assetsManager.addMeshTask("logo task", "logo", "", "/logo.glb", );
        task.onSuccess = t => {
            const root = t.loadedMeshes[0];
            const control = root.getChildTransformNodes().find(m => m.name === "logo") as TransformNode;
            control?.setParent(null);
            root.dispose();
            control!.position.copyFrom(pos);
            control!.scaling = new Vector3(-scale.x, scale.y, scale.z); 
            const lights = canvasContext?.scene?.lights || [];
            control.getChildMeshes().forEach(m => {
                m.isPickable = false;
                lights.forEach(light => {
                    const sg = light.getShadowGenerator() as ShadowGenerator; 
                    if(sg) sg.addShadowCaster(m);
                });

            })
            

            canvasContext!.setModels!({...canvasContext!.models, logo: control});
        }
        task.onError = (t, message, exception) => {
            console.error("Error loading logo:", message, exception);
        };

        

    }


    useEffect(() => {
        
        if (canvasContext?.scene && canvasContext?.assetsManager && !canvasContext.models?.logo) {
            load();
        }

    }, [canvasContext]);


}