import {AbstractMesh, Mesh, MeshBuilder, Scene, StandardMaterial} from "@babylonjs/core";
import {GradientMaterial} from "@babylonjs/materials";
import {Resources} from "../../../../../services/infrastructure/Resources";

const setupResources = (scene: Scene): Resources => {
    const meshTopology = new Mesh("Topology rib base mesh", scene);
    meshTopology.visibility = 0;
    const meshGeometry = new Mesh("Geometry rib base mesh", scene);
    meshGeometry.visibility = 0;
    const nodeBaseMesh = MeshBuilder.CreateSphere(`Node base mesh`,
        {
            diameter: 0.15,
            updatable: true
        }, scene);
    nodeBaseMesh.visibility = 0;

    return {
        materials: {
            ribGradientMaterial: new GradientMaterial("Gradient material", scene),
            ribMaterial: new StandardMaterial("Rib material", scene),
            nodeMaterial: new StandardMaterial("Node material", scene),
        },
        baseMeshes: {
            nodeBaseMesh: nodeBaseMesh,
            topologyRibBaseMesh: meshTopology,
            geometryRibBaseMesh: meshGeometry
        }
    }
}

export default setupResources;