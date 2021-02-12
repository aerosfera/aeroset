import {Mesh} from "@babylonjs/core";
import {Vector3D} from "../base/Vector3D";

export interface RibMesh {
    node1Id: string,
    node2Id: string,
    node1Point : Vector3D,
    node2Point : Vector3D,
    mesh: Mesh
}