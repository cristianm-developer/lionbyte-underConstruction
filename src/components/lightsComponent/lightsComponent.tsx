import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { useInitLights } from "./hooks/useInitLights";




export const LightsComponent = () => {

    const canvasContext = useCanvasContext();
    useInitLights(canvasContext);


    

    return null;

}