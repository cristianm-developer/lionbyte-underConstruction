import { useContext } from "react";
import { CanvasContext } from "../canvasContext";


export function useCanvasContext() {
    const context = useContext(CanvasContext);

    if(!context)
        throw new Error("useCanvasContext must be used within a CanvasContextProvider");

    return context;
}