import Scheme from "../../../../../models/scheme/Scheme";
import {Scene} from "@babylonjs/core/scene";
import {MeshBuilder, SolidParticleSystem, Vector3} from "@babylonjs/core";

export const constructTopologyScheme = async (scheme: Scheme, scene: Scene): Promise<void> => {
    const sceneSPS: SolidParticleSystem = new SolidParticleSystem("SceneSPS", scene);

    for (const node of scheme.nodes) {
        const point = node.point;
        const nodeVector = new Vector3(point.x, point.y, point.z)
        const nodeId = node.id.toString();

        const sphere = MeshBuilder.CreateSphere(`sphere, id=${nodeId}`,
            {
                diameter: 2
            }, scene);

        sphere.position = nodeVector

        sceneSPS.addShape(sphere, 1)
        sphere.dispose()
    }

    sceneSPS.buildMesh()
    // sceneSPS.initParticles = function () {
    //     const node = sceneSPS.particles
    //     const point = node.point;
    //     const nodeVector = new Vector3(point.x, point.y, point.z)
    //     SPS.particles[0].color = new BABYLON.Color4(1, 1, 1, 1);
    //     for (var p = 1; p < SPS.nbParticles; p++) {
    //         myPositionFunction(SPS.particles[p]);
    //     }
    // }
    // sceneSPS.updateParticle = () => {
    //     SPS.particles[0].color = new BABYLON.Color4(1, 1, 1, 1);
    //     for (var p = 1; p < SPS.nbParticles; p++) {
    //         myPositionFunction(SPS.particles[p]);
    //     }
    // }
}