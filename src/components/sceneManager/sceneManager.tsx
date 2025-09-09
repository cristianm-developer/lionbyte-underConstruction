'use client';

import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { useLoadAssets } from "./hooks/useLoadAssets";
import { useState } from "react";
import { Mesh, TransformNode } from "@babylonjs/core";


export interface IModels {
    logo?: Mesh | TransformNode | null | undefined;
    floor?: Mesh | TransformNode | null | undefined;
    warningLetter?: Mesh | TransformNode | null | undefined;
}


export const SceneManager = ({children}: {children?: React.ReactNode}) => {

    const context = useCanvasContext();

    useLoadAssets(context);


    return <>
    {children}
    
    </>
}