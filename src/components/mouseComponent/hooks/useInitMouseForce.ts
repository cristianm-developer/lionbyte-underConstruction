import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { IPointerEvent, Mesh, PointerEventTypes, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";


export function useInitMouseForce({ force = 10, decay = 20 }: { force?: number; decay?: number }) {
    const canvasContext = useCanvasContext();
    const baseZ = useRef(0);
    const cubes = useRef<Mesh[]>([]);
    
    const lastCall = useRef<number>(0);
    const throttleDelay = 24; 
    const throttledHandler = () => {
        const now = performance.now();
        if (now - lastCall.current < throttleDelay) {
            return false;
        }
        lastCall.current = now;
        return true;
    }

    const init = () => {

        const scene = canvasContext.scene!;
        
        const handler = (x: number, y: number) => {

            if (!throttledHandler()) {
                return;
            }

            const pickResult = scene.pick(x, y, (m)=> m.name.startsWith('floor'));
            
            if(cubes.current.length === 0) {
                cubes.current = scene.getTransformNodeByName('floor')?.getChildMeshes() || [];
                baseZ.current = cubes.current[0]?.position.z || 0;
            }
            
            if(cubes.current.length === 0) {
                return;
            }

            if (!pickResult?.hit) {
                cubes.current.forEach(cube => {
                    cube.position.z = baseZ.current;
                });
                return;
            };


            

            cubes.current.forEach(cube => {
                
                const worldPos = cube.getAbsolutePosition();                

                const cubePos2d = new Vector3(worldPos.x, worldPos.y, 0);
                const pickPos2d = new Vector3(pickResult.pickedPoint!.x, pickResult.pickedPoint!.y, 0);

                const distance = Vector3.Distance(cubePos2d, pickPos2d);

                if(distance > decay) {
                    cube.position.z = baseZ.current;
                    return
                }

                let factor = Math.min(1, Math.max(0, 1 - distance / decay));
                
                const distanceCenter = Vector3.Distance(Vector3.Zero().add(new Vector3(0, 4, 0)), pickPos2d);
                const centerSize = 10;
                const factorCenter = Math.max(0, 1 - distanceCenter / centerSize);

                const distanceCenterBottom = Vector3.Distance(new Vector3(0, -12, 0), pickPos2d);
                const centerBottomSize = 20;
                const factorCenterBottom = Math.max(0, 1 - distanceCenterBottom / centerBottomSize);

                factor = Math.max(0, factor - factorCenter);
                factor = Math.max(0, factor - factorCenterBottom);

                const targetZ = baseZ.current + (factor * force);
            
                cube.position.z = targetZ ;
                cube.computeWorldMatrix(true);
              
            });
        
        }
        
        scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type === PointerEventTypes.POINTERMOVE) {
                const { x, y } = pointerInfo.event;
                handler(x, y);
            }
        });
    }

    useEffect(() => {

        if (!canvasContext || !canvasContext.scene ) return;
        init();


    }, [force, decay, canvasContext, canvasContext.models?.floor])
}