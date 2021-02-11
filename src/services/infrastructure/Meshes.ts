import {Mesh} from "@babylonjs/core";

export default interface BaseMeshes {
    nodeBaseMesh: Mesh
    topologyRibBaseMesh: Mesh,
    geometryRibBaseMesh: Mesh
}