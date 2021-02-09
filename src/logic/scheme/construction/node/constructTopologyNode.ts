import {Scene} from "@babylonjs/core/scene";
import {Color3, Mesh, MeshBuilder, StandardMaterial} from "@babylonjs/core";

let materialBase: StandardMaterial | null;
let sphereBase: Mesh | null;

export const constructTopologyNode = (scene: Scene, nodeId: string): Mesh => {
    if (!sphereBase) {
        sphereBase = MeshBuilder.CreateSphere(`sphere, id=${nodeId}`,
            {
                diameter: 0.15,
                updatable: true
            }, scene);
        sphereBase.visibility = 0;
    }

    const mesh = sphereBase.clone("sphere")
    mesh.visibility = 1;

    if (!materialBase)
        materialBase = new StandardMaterial("box_mat2", scene);


    const material = materialBase.clone("mat");
    material.alpha = 1;
    material.diffuseColor = new Color3(1, 1, 1);
    mesh.material = material

    return mesh
}

export default constructTopologyNode