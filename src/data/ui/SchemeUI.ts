import {Mesh} from "@babylonjs/core";
import {NodeMesh} from "./NodeMesh";
import {RibMesh} from "./RibMesh";

export interface SchemeUI {
    nodes: NodeMesh[]
    ribs: RibMesh[],
    parent: Mesh
}