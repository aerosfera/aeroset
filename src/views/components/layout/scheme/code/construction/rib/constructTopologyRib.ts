import {Scene} from "@babylonjs/core/scene";
import {Color3, Mesh, MeshBuilder, StandardMaterial, Vector3, VertexBuffer} from "@babylonjs/core";

export const constructTopologyRib = (scene: Scene, nodeVector: Vector3, linkedNodeVector: Vector3): Mesh => {
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
    //tube.unfreezeNormals();

    // const tube = MeshBuilder.CreateTube("tube", {
    //     path: [nodeVector, linkedNodeVector],
    //     radius: 0.02,
    //     updatable: true
    // }, scene);

    const material = new StandardMaterial("rib_mat", scene)
    material.alpha = 1;
    material.diffuseColor = new Color3(89/255, 182/255, 91/255);
    tube.material = material

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

    return tube
}

export default constructTopologyRib