import Scheme from "../../../../../models/scheme/Scheme";
import Node from "../../../../../models/scheme/Node";
import {Scene} from "@babylonjs/core/scene";
import {
    Color3,
    Color4, FloatArray,
    MeshBuilder, Nullable,
    SolidParticleSystem,
    StandardMaterial, Texture,
    Vector3,
    VertexBuffer
} from "@babylonjs/core";
import {Point} from "../../../../../models/scheme/Point";

export const constructTopologyScheme = async (scheme: Scheme, scene: Scene): Promise<void> => {
    const sceneSPS: SolidParticleSystem = new SolidParticleSystem("SceneSPS", scene, {
        updatable: true,
        isPickable: true
    });

    const pointsIdDrawingLinesFull = new Array<string>()

    for (const node of scheme.nodes) {
        const nodeId = node.id.toString();
        const sphere = MeshBuilder.CreateSphere(`sphere, id=${nodeId}`,
            {
                diameter: 0.15
            }, scene);

        sceneSPS.addShape(sphere, 1)
        sphere.dispose()

        const nodesIdToDrawingLine = node
            .linkedNodes
            .filter(value => !pointsIdDrawingLinesFull.includes(value));

        // const mat = new StandardMaterial("", scene);
        // mat.diffuseTexture= new Texture("https://i.imgur.com/v4jNocU.jpg", scene);

        if (nodesIdToDrawingLine.length > 0) {
            const nodePoint = node.point;
            const nodeVector = new Vector3(nodePoint.x / 100, nodePoint.y / 100, nodePoint.z / 10);

            for (const linkedNodeId of nodesIdToDrawingLine) {
                const linkedNode = scheme.nodes.find(x => x.id === linkedNodeId) as Node

                if (!linkedNode)
                    continue

                const linkedNodePoint = linkedNode.point
                const linkedNodeVector = new Vector3(linkedNodePoint.x / 100, linkedNodePoint.y / 100, linkedNodePoint.z / 10);

                const tube = MeshBuilder.CreateTube("tube", {
                    path: [nodeVector, linkedNodeVector],
                    radius: 0.02,
                    updatable: true
                }, scene);

                let colors = new Array(2);
                let color = Color3.Random();
                for (let i = 0; i < 2; i++) {
                    colors[i * 4 + 0] = color.r;
                    colors[i * 4 + 1] = color.g;
                    colors[i * 4 + 2] = color.b;
                    colors[i * 4 + 3] = 1;
                }
                tube.setVerticesData(VertexBuffer.ColorKind, colors)

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
            }

            pointsIdDrawingLinesFull.push(node.id)
        }
    }

    sceneSPS.buildMesh()

    sceneSPS.initParticles = function () {
        for (let i = 0; i < sceneSPS.nbParticles; i++) {
            const node = scheme.nodes[i]

            const point = sceneSPS.particles[i]
            point.position.x = node.point.x / 100
            point.position.y = node.point.y / 100
            point.position.z = node.point.z / 10

            point.color = new Color4(3, 3, 3, 1)
        }
    }
    sceneSPS.initParticles();
    sceneSPS.setParticles();
    sceneSPS.refreshVisibleSize();
}