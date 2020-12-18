import {Mesh, Vector3} from "@babylonjs/core";

export default interface SchemeNodeMetadata{
    mesh: Mesh,
    nodeVector: Vector3,
    linkedNodeVector: Vector3
}