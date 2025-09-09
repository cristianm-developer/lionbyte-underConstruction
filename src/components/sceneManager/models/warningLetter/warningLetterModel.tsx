import { Vector3 } from "@babylonjs/core";
import { useInitWarningLetterModel } from "./hooks/useInitWarningLetterModel";
import { useInitLightBase } from "./hooks/useInitLightBase";
import { useInitLightAnimations } from "./hooks/useInitLightAnimations";

export interface WarningLetterModelProps {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
}

export const WarningLetterModel = ({position, rotation, scale}: WarningLetterModelProps) => {

    useInitWarningLetterModel(position, scale);
    useInitLightBase({position, rotation, scale});
    useInitLightAnimations(position);

    return null;
    
}