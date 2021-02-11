import {Scene} from "@babylonjs/core/scene";
import {Color3, Mesh, MeshBuilder, StandardMaterial} from "@babylonjs/core";

export const constructGeometryNode = (scene: Scene, nodeId: string, materialBase: StandardMaterial, sphereBase: Mesh): Mesh | null => {
    const mesh = sphereBase.clone("sphere");
    mesh.visibility = 0;
    return mesh
}

export default constructGeometryNode;