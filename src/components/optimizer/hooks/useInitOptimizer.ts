import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext"
import { HardwareScalingOptimization, SceneOptimizer, SceneOptimizerOptions, ShadowsOptimization } from "@babylonjs/core";
import { useEffect } from "react"


export function useInitOptimizer() {

    const canvasContext = useCanvasContext();

    const init = () => {


        const options = SceneOptimizerOptions.ModerateDegradationAllowed();
        options.addOptimization(new HardwareScalingOptimization(0, 1));
        options.addOptimization(new ShadowsOptimization(3))
        options.targetFrameRate = 24;

        const optimizer = new SceneOptimizer(canvasContext!.scene!, options , true, false);
        
        //optimizer.start();

    }

    useEffect(() => {
        if(!canvasContext || !canvasContext.scene) return;
        init();

    }, [canvasContext])

}