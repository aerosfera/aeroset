import SolidPoint from "../SolidPoint";

export default function filterPoints(points: SolidPoint[]) : SolidPoint[]{
    let filterParameters = {
        filterXFromLimit : -5,
        filterXToLimit : 5,
        filterYFromLimit : -5,
        filterYToLimit : 5,
        filterZFromLimit : -5,
        filterZToLimit : 5,
    };

    const filteredPoints = points.filter(point => {
        const {x, y, z} = point

        if ((x >= filterParameters.filterXFromLimit && x <= filterParameters.filterXToLimit)
            &&
            (y >= filterParameters.filterYFromLimit && y <= filterParameters.filterYToLimit)
            &&
            (z >= filterParameters.filterZFromLimit && z <= filterParameters.filterZToLimit)) {
            return true;
        }

        return false;
    });

    return filteredPoints;
}