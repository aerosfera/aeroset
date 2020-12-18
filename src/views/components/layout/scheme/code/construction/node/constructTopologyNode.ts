import {Scene} from "@babylonjs/core/scene";
import {Color3, Mesh, MeshBuilder, StandardMaterial} from "@babylonjs/core";

export const constructTopologyNode = (scene: Scene, nodeId: string): Mesh => {
    const mesh = MeshBuilder.CreateSphere(`sphere, id=${nodeId}`,
        {
            diameter: 0.15,
            updatable : true
        }, scene);

    const material = new StandardMaterial("box_mat2", scene)
    material.alpha = 1;
    material.diffuseColor = new Color3(1.0, 0.2, 0.7);
    mesh.material = material

    return  mesh
}

export default constructTopologyNode