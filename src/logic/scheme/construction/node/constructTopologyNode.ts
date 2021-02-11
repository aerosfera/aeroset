import {Scene} from "@babylonjs/core/scene";
import {Mesh, StandardMaterial} from "@babylonjs/core";

export const constructTopologyNode = (scene: Scene, nodeId: string, materialBase: StandardMaterial, sphereBase: Mesh): Mesh => {
    const mesh = sphereBase.clone("sphere node " + nodeId);
    mesh.visibility = 1;
    mesh.freezeNormals();
    return mesh
}

export default constructTopologyNode