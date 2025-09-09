
import { useInitMouseForce } from "./hooks/useInitMouseForce";
import { useInitMouseLight } from "./hooks/useInitMouseLight";


export const MouseComponent = ({
    lightConfig,
    pushConfig
}: {
    lightConfig?: {
        intensity: number;
    },
    pushConfig?: {
        force: number;
        decay: number;
    }
}) => {

    useInitMouseLight({ intensity: lightConfig?.intensity || 0.5});
    useInitMouseForce({force: pushConfig?.force || 10, decay: pushConfig?.decay || 20});
    // useInitMouseEvents();

    return null;
}