import {Color4, Vector3} from "@babylonjs/core";
import PointCloudState from "../../views/components/layout/pointCloudSystem/code/PointCloudState";
import SolidPoint from "../../views/components/layout/pointCloudSystem/code/SolidPoint";

export const calculateParticleAsync = async (i: number, point: SolidPoint, parameterMin: number, parameterDiff: number): Promise<{ vector: Vector3, color: Color4 }> => {
    const pPercent = ((point.parameter - parameterMin) / parameterDiff) * 100;

    let r: number = 0;
    let g: number = 0;
    let b: number = 0;

    if (pPercent <= 0) {
        r = 0;
        g = 0;
        b = 0;
    } else if (pPercent > 0 && pPercent <= 25) {
        r = 255;
        g = 0 - ((0 - 255) / (0 - 25)) * (0 - pPercent);
        b = 0;
    } else if (pPercent > 25 && pPercent <= 50) {
        r = 255 - ((255 - 0) / (25 - 50)) * (25 - pPercent);
        g = 255;
        b = 0;
    } else if (pPercent > 50 && pPercent <= 75) {
        r = 0;
        g = 255;
        b = 0 - ((0 - 255) / (50 - 100)) * (50 - pPercent);
    } else if (pPercent > 75 && pPercent <= 100) {
        r = 0;
        g = 255 - ((255 - 0) / (75 - 100)) * (75 - pPercent);
        b = 255;
    } else if (pPercent > 100) {
        r = 0;
        g = 0;
        b = 0;
    }

    return {vector: new Vector3(point.x, point.y, point.z), color: new Color4(r / 255, g / 255, b / 255, 1)}
}