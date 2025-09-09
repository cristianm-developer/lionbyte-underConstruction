import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext"
import { Engine, Mesh, MeshBuilder, PBRMaterial, ShadowGenerator, TransformNode, Vector3 } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";


export function useInitFloorModel() {

    const contextCanvas = useCanvasContext();
    const mounted = useRef(false);
    const material = useRef<PBRMaterial | null>(null);

    const init = () => {
        mounted.current = true;
        const root = new TransformNode('floor', contextCanvas!.scene!);

        createMaterial();

        const aspect = contextCanvas.engine!.getRenderWidth() / contextCanvas.engine!.getRenderHeight() ;
        const fov = contextCanvas.camera?.fov || 1;
        const distance = Math.abs(contextCanvas.camera?.position.z || 10);

        const height = 2 * distance * Math.tan(fov / 2);
        const width = height * aspect;

        const cubeSize = 1.2;
        const spacing = 1.02;

        const worldW = width / cubeSize;
        const worldH = height / cubeSize;

        const sizeColumns = Math.ceil(worldW) + 4 ;
        const sizeRows = Math.ceil(worldH) + 2 ;


        const cubes: Mesh[] = [];

        for(let i = 0; i < sizeColumns; i++) {

            for(let j = 0; j < sizeRows; j++) {
                const pos = new Vector3(i*cubeSize*spacing, j*cubeSize*spacing, 5);
                const cube = createFloorCube(root, pos, cubeSize, cubes.length);
                cubes.push(cube);
            }

        }

        const widthFloor = (sizeColumns - 1) * cubeSize * spacing;
        const heightFloor = (sizeRows - 1) * cubeSize * spacing;

        root.position = new Vector3(-widthFloor/2, -heightFloor/2, 1.5);

    }

    const createFloorCube = (parent: TransformNode,  pos: Vector3, size: number,  index: number) => {
        const box = MeshBuilder.CreateBox(`floor_cube_${index}`, { width: size, height: size, depth: size * 5 }, contextCanvas!.scene!);

        box.setPivotPoint(new Vector3(-size/2, -size/2, 0));

        box.position.copyFrom(pos);
        box.parent = parent;
        box.material = material.current;
        box.receiveShadows = true;
 

        return box;
    }

    const createMaterial = () => {
        material.current = new PBRMaterial('floor_material', contextCanvas!.scene!);
        material.current.metallic = 0.6;
        material.current.roughness = 0.5;
        material.current.maxSimultaneousLights = 8;
        
    }

    useEffect(() => {
        if (contextCanvas?.scene && contextCanvas?.assetsManager && !mounted.current) {
            init();
        }
    }, [contextCanvas]);

}