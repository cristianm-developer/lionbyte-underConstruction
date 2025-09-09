import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { useRef, useState } from "react";
import { useInitCanvas } from "./hooks/useInitCanvas";
import style from "./babylonCanvas.module.scss";

export interface IBabylonCanvasConfig {

    
        showDebug: boolean;
        attachCameraControl: boolean;
    };


export const BabylonCanvas = ({ children , initConfig}: { 
    children: React.ReactNode, 
    initConfig: IBabylonCanvasConfig}) => {

    const canvasElRef = useRef<HTMLCanvasElement>(null);
    const canvasContext = useCanvasContext();

    useInitCanvas(canvasElRef, initConfig);



    return <div className={style.mainComponent}>
        <canvas id="renderCanvas" ref={canvasElRef}></canvas>
        
        {canvasContext && children}
    </div>;

}