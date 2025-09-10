import { ICanvasContext } from "@/context/canvasContext/canvasContext";
import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { Color4, Engine, FreeCamera, ImportAnimationsAsync, Scene, Vector3 } from "@babylonjs/core";
import { RefObject, useEffect } from "react";
import { IBabylonCanvasConfig } from "../babylonCanvas";
import { LoaderComponentClass } from "@/components/loader/loaderComponent";

export function useInitCanvas(canvasEl: RefObject<HTMLCanvasElement | null>, initConfig: IBabylonCanvasConfig) {

    const canvasContext = useCanvasContext() as ICanvasContext;
    const debugMode = process.env.NEXT_PUBLIC_SHOW_DEBUG === 'true';

    const createEngine = () => {

        const engine = new Engine(canvasEl.current!, true);
        engine.loadingScreen = new LoaderComponentClass();
        canvasContext.setEngine(engine);
        engine.displayLoadingUI();

        return engine;
    }

    const createScene = (engine: Engine) => {
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        scene.skipPointerMovePicking = false;
        
        if (initConfig.showDebug) {
            
            import('@babylonjs/inspector').then(() => {
                scene.executeWhenReady(() => {
                    scene.debugLayer.show();
                });
            });
            
        }
        

        return scene;
    }

    const createCamera = (scene: Scene) => {
        const camera = new FreeCamera('mainCamera', new Vector3(0, 0, -40), scene);
        camera.setTarget(Vector3.Zero());

        if(initConfig.attachCameraControl) {
            camera.attachControl(canvasEl.current!, true);
        }

        return camera;
    }

    const runEngine = (engine: Engine, scene: Scene) => {
        engine.runRenderLoop(() => {
            scene.render();
        });
    }

    const listenResize = (engine: Engine) => {
        window.addEventListener('resize', () => {
            engine.resize();
        });
    }

    useEffect(() => {

        canvasContext.setCanvas(canvasEl.current!);
        const engine = createEngine();
        const scene = createScene(engine);
        const camera = createCamera(scene);
        listenResize(engine);
        runEngine(engine, scene);

        canvasContext.setEngine(engine);
        canvasContext.setScene(scene);
        canvasContext.setCamera(camera);

        return () => {
            if (engine) {
                engine.dispose();
            }
        }
    }, [canvasEl]);



}