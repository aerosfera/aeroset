import SolidPoint from "./SolidPoint";

export default interface PointCloudState{
    filteredPoints : SolidPoint[],
    parameterMin : number,
    parameterMax : number,
    parameterDiff : number,
}