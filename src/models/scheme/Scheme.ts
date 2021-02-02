import Node from '../Node'
import SchemeInfo from "./SchemeInfo";
import {SchemeMode} from "../../views/types/SchemeMode";

export default interface Scheme extends SchemeInfo {
    nodes: Node[]
}