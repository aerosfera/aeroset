import SolidPoint from "./SolidPoint";
import {PointCloudFiltersState} from "../../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";

export default function filterPointCloud(points: SolidPoint[], cloudPointFilters: PointCloudFiltersState): SolidPoint[] {
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