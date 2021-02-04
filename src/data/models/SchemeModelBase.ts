import NodeValuePair from "./NodeValuePair";
import Scheme from "../scheme/Scheme";

export default interface SchemeModelBase {
    id: string
    name: string
    created: Date,
    updated: Date,
    values: NodeValuePair[],
    scheme : Scheme
}