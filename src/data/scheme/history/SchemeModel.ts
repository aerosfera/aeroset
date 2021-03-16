import NodeValuePair from "../NodeValuePair";

export default interface SchemeModel {
    values: NodeValuePair[],
    parameterMin : number,
    parameterMax : number
}