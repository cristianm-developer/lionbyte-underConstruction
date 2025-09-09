'use client';

import { useCanvasContext } from "@/context/canvasContext/hooks/useCanvasContext";
import { Vector3 } from "@babylonjs/core";
import { useState } from "react";
import { useLoadLogo } from "./hooks/useLoadLogo";



export const LogoModel = ({}) => {

    const [pos, setPos] = useState(new Vector3(0,0,2.2));
    const [scale, setScale] = useState(new Vector3(5, 5, 5));

    useLoadLogo(pos, scale);



 
    return null;
}