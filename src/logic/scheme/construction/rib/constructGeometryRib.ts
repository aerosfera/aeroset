import {Scene} from "@babylonjs/core/scene";
import {Color3, Mesh, StandardMaterial, Vector3} from "@babylonjs/core";

export const constructGeometryRib = (scene: Scene, nodeVector: Vector3, linkedNodeVector: Vector3): Mesh | null => {
    const box = Mesh.CreateBox("box", 0.3, scene, false);

    //tube.unfreezeNormals();

    // const tube = MeshBuilder.CreateTube("tube", {
    //     path: [nodeVector, linkedNodeVector],
    //     radius: 0.02,
    //     updatable: true
    // }, scene);

    const material = new StandardMaterial("rib_mat", scene)
    material.alpha = 1;
    material.diffuseColor = new Color3(255 / 255, 255 / 255, 255 / 255);
    box.material = material;

    box.position = nodeVector;

    const diffX = linkedNodeVector.x - nodeVector.x;
    const diffY = linkedNodeVector.y - nodeVector.y;
    const diffZ = linkedNodeVector.z - nodeVector.z;

    box.scaling.x = diffX /linkedNodeVector.x
    box.scaling.y = diffY /linkedNodeVector.y
    box.scaling.z = diffZ /linkedNodeVector.z

    // let colors = new Array(2);
    // let color = Color3.Random();
    // for (let i = 0; i < 2; i++) {
    //     colors[i * 4 + 0] = color.r;
    //     colors[i * 4 + 1] = color.g;
    //     colors[i * 4 + 2] = color.b;
    //     colors[i * 4 + 3] = 1;
    // }
    // tube.setVerticesData(VertexBuffer.ColorKind, colors)

    //tube.material = mat
    // const line = MeshBuilder.CreateLines("line", {
    //     points: [nodeVector, linkedNodeVector],
    //     updatable: true
    //}, scene);

    // var tessNb = 64;
    // scene.registerBeforeRender(() => {
    //     let uvs = tube.getVerticesData(VertexBuffer.UVKind) as FloatArray;
    //     uvs = Array.from(uvs); //converstion of float32array to array in order to pop and unshift
    //     for (var i = 0; i < tessNb + 1; i++) {
    //         let temp = uvs.pop() as number
    //         uvs.unshift(temp);
    //         temp = uvs.pop() as number;
    //         uvs.unshift(temp);
    //     }
    //     tube.updateVerticesData(VertexBuffer.UVKind, uvs);
    // });

    return box;
}

export default constructGeometryRib