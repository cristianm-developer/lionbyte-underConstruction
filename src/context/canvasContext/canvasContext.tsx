'use client';

import { IModels } from "@/components/sceneManager/sceneManager";
import { AssetsManager, Engine, FreeCamera, IPointerEvent, PointerInfo, Scene } from "@babylonjs/core";
import React from "react";


export interface ICanvasContext {
    canvas: HTMLCanvasElement | null;
    setCanvas: (canvas: HTMLCanvasElement) => void;
    engine: Engine | null;
    setEngine: (engine: Engine) => void;
    scene: Scene | null;
    setScene: (scene: Scene) => void;
    camera: FreeCamera | null;
    setCamera: (camera: FreeCamera) => void;
    models: IModels | null;
    setModels: (models: IModels) => void;
    assetsManager: AssetsManager | null;
    setAssetsManager: (loader: AssetsManager) => void;
}

export const CanvasContext = React.createContext<ICanvasContext | undefined>(undefined);

export const CanvasContextProvider = ({children}: {children: React.ReactNode}) => {
    const [engine, setEngine] = React.useState<Engine | null>(null);
    const [scene, setScene] = React.useState<Scene | null>(null);
    const [camera, setCamera] = React.useState<FreeCamera | null>(null);
    const [models, setModels] = React.useState<IModels | null>(null);
    const [assetsManager, setAssetsManager] = React.useState<AssetsManager | null>(null);
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);

    const value = { engine, scene, camera, setEngine, setScene, setCamera, models, setModels, assetsManager, setAssetsManager, canvas, setCanvas };

    return (
        <CanvasContext.Provider value={value}>
            {children}
        </CanvasContext.Provider>
    );
}

