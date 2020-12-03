import {PointCloudFiltersState} from "../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import SolidPoint from "../../views/components/layout/pointCloudSystem/code/SolidPoint";
import calculateMinMaxOfArray from "../../utilities/math/calculateMaxMinOfArray";
import {Color4, Vector3} from "@babylonjs/core";

export const filterPointCloudAsync = async (fileText: string, cloudPointFilters: PointCloudFiltersState): Promise<{ vector: { x: number, y: number, z: number }, color: { r: number, g: number, b: number } }[]> => {
    const filter = (points: SolidPoint[], cloudPointFilters: PointCloudFiltersState): SolidPoint[] => {
        const filteredPoints = points.filter(point => {
            const {x, y, z} = point

            if ((x >= cloudPointFilters.filterXFromLimit && x <= cloudPointFilters.filterXToLimit)
                &&
                (y >= cloudPointFilters.filterYFromLimit && y <= cloudPointFilters.filterYToLimit)
                &&
                (z >= cloudPointFilters.filterZFromLimit && z <= cloudPointFilters.filterZToLimit)) {
                return true;
            }

            return false;
        });

        return filteredPoints;
    }

    const calculateParticle = (i: number, point: SolidPoint, parameterMin: number, parameterDiff: number): { vector: { x: number, y: number, z: number }, color: { r: number, g: number, b: number } } => {
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

        return {vector: {x: point.x, y: point.y, z: point.z}, color: {r: r / 255, g: g / 255, b: b / 255}}
    }

    const fileLines: string[] = []
    const lines: string[] = fileText.split('\n')
    lines.forEach((line) => {
        fileLines.push(line.slice(0, -1))
    });

    const points: SolidPoint[] = fileLines.map((line: string) => {
        const points: string[] = line.split(';');
        const x: number = Number.parseFloat(points[0] ? points[0].replace(',', '.') : "0");
        const y: number = Number.parseFloat(points[1] ? points[1].replace(',', '.') : "0");
        const z: number = Number.parseFloat(points[2] ? points[2].replace(',', '.') : "0");
        const p: number = Number(points[3] ? points[3].replace(',', '.') : "0");

        return new SolidPoint(x, y, z, p)
    });

    const parameters = points.map(p => p.parameter)
    //const {max, min} = calculateMinMaxOfArray(parameters);
    const parameterMin = -5//min
    const parameterMax = 5//max
    const parameterDiff = parameterMax - parameterMin;

    const filteredPoints: SolidPoint[] = filter(points, cloudPointFilters)

    const pointsCount = filteredPoints.length;
    const result = new Array<{ vector: { x: number, y: number, z: number }, color: { r: number, g: number, b: number } }>()
    for (let i = 0; i < pointsCount; i++) {
        const point = calculateParticle(i, filteredPoints[i], parameterMin, parameterDiff)
        result.push(point)
    }

    return result
}
