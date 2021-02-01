import Node from './Node'
import SchemeInfo from "./SchemeInfo";
import {SchemeMode} from "../views/types/SchemeMode";
import {Mesh} from "@babylonjs/core";

export default interface Scheme extends SchemeInfo {
    nodes: Node[]
    mode : SchemeMode
    ui : Mesh[] | null
}