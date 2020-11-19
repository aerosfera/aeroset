import {PointCloudFiltersState} from "../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";

import SolidPoint from "../../views/components/layout/pointCloudSystem/code/SolidPoint";
import PointCloudState from "../../views/components/layout/pointCloudSystem/code/PointCloudState";
import calculateMinMaxOfArray from "../../utilities/math/calculateMaxMinOfArray";


export const filterPointCloudAsync = async (fileText: string, cloudPointFilters: PointCloudFiltersState): Promise<PointCloudState> => {
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
    const {max, min} = calculateMinMaxOfArray(parameters);
    const parameterMin = min
    const parameterMax = max

    const filteredPoints: SolidPoint[] = filter(points, cloudPointFilters)
    return {filteredPoints, parameterMin, parameterMax, parameterDiff: parameterMax - parameterMin}
}
