import { ICanvasContext } from "@/context/canvasContext/canvasContext";
import { AssetsManager, Mesh } from "@babylonjs/core";
import { useEffect } from "react";

export function useLoadAssets(canvasContext: ICanvasContext) {


    const createAssetsLoader = () => {
        const assetsManager = new AssetsManager(canvasContext.scene!);
        return assetsManager;
    }


    useEffect(() => {
        if (!canvasContext.scene || !canvasContext) return;
        const assetsLoader = createAssetsLoader();

        canvasContext.setAssetsManager(assetsLoader);

    }, [canvasContext.scene]);

}