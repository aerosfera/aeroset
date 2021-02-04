import {Mesh} from "@babylonjs/core";

export interface RibMesh {
    node1Id: string,
    node2Id: string,
    mesh: Mesh
}