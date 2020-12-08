import Scheme from "../../../../../models/scheme/Scheme";
import {Scene} from "@babylonjs/core/scene";
import {Color4, MeshBuilder, SolidParticleSystem, Vector3} from "@babylonjs/core";

export const constructTopologyScheme = async (scheme: Scheme, scene: Scene): Promise<void> => {
    const sceneSPS: SolidParticleSystem = new SolidParticleSystem("SceneSPS", scene, {
        updatable: true,
        isPickable : true
    });

    for (const node of scheme.nodes) {
        const nodeId = node.id.toString();
        const sphere = MeshBuilder.CreateSphere(`sphere, id=${nodeId}`,
            {
                diameter: 0.25
            }, scene);

        sceneSPS.addShape(sphere, 1)
        sphere.dispose()
    }

    sceneSPS.buildMesh()


    sceneSPS.initParticles = function () {
        for (let i = 0; i < sceneSPS.nbParticles; i++) {
            const node = scheme.nodes[i]

            const point = sceneSPS.particles[i]
            point.position.x = node.point.x
            point.position.y = node.point.y
            point.position.z = node.point.z

            point.color = new Color4(3, 3, 3, 1)
        }
    }
    sceneSPS.initParticles();
    sceneSPS.setParticles();
    sceneSPS.refreshVisibleSize();
}