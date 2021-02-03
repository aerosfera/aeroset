import NodeValuePair from "./NodeValuePair";
import Scheme from "../scheme/Scheme";

export default interface SchemeModel {
    id: string
    name: string
    created: Date,
    updated: Date,
    values: NodeValuePair[],
    scheme : Scheme
}