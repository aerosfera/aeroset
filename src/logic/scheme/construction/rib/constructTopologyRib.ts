import {Scene} from "@babylonjs/core/scene";
import {Color3, Mesh, MeshBuilder, StandardMaterial, Vector3, VertexBuffer} from "@babylonjs/core";
import {nanoid} from "@reduxjs/toolkit";

export const constructTopologyRib = (scene: Scene,
                                     nodeVector: Vector3,
                                     linkedNodeVector: Vector3,
                                     materialBase: StandardMaterial): Mesh => {
    const tube = Mesh.CreateTube("tube",
        [nodeVector, linkedNodeVector],
        0.02,
        // @ts-ignore
        null,
        null,
        3,
        scene,
        true,
        null,
        null);

    tube.freezeNormals();//for speedup

    return tube
}

export default constructTopologyRib