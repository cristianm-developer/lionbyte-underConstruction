import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { IPointerEvent, PointerEventTypes, PointerInfo, PointerInput, PointLight, ShadowGenerator, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react"

export function useInitMouseLight({ intensity }: { intensity: number }) {

    const canvasContext= useCanvasContext();
    let light: PointLight | null = null;

    const lastCall = useRef<number>(0);
    const throttleDelay = 28; 
    const throttledHandler = () => {
        const now = performance.now();
        if (now - lastCall.current < throttleDelay) {
            return false;
        }
        lastCall.current = now;
        return true;
    }

    const init = () => {

        light = new PointLight('mouseLight', new Vector3(0,0,0), canvasContext.scene!);
        light.intensity = intensity;

        const shadowGenerator = new ShadowGenerator(512, light);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;
        shadowGenerator.setDarkness(0.5);
        shadowGenerator.filter = ShadowGenerator.FILTER_PCF;

        const scene = canvasContext.scene!;

        const handler = (x: number,y: number) => {
            if (!throttledHandler()) {
                return;
            }

            const pickResult = scene.pick(x, y);
            if(pickResult?.hit && light) {
                light.position = pickResult.pickedPoint!.add(new Vector3(0,0,-3));
            }
        }

        scene.onPointerObservable.add((pointerInfo: PointerInfo) => { 
            if(pointerInfo.type !== PointerEventTypes.POINTERMOVE) 
                return;

            const { x, y } = pointerInfo.event;
            handler(x, y);

        });

    }

    useEffect(() => {

        if(!canvasContext.scene)
            return;

        init();
    }, [canvasContext.scene, intensity]);

}