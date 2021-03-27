import Scheme from "../../data/scheme/Scheme";
import Node from "../../data/base/Node";
import {
    ArcRotateCamera,
    Mesh,
    Vector3,
} from "@babylonjs/core";
import {SchemeMode} from "../../data/scheme/SchemeMode";
import constructGeometryNode from "./construction/node/constructGeometryNode";
import constructTopologyNode from "./construction/node/constructTopologyNode";
import constructTopologyRib from "./construction/rib/constructTopologyRib";
import constructGeometryRib from "./construction/rib/constructGeometryRib";
import attachOwnPointerDragBehavior from "./behaviors/pointerDragBehavior";
import SchemeNodeMetadata from "../../views/types/SchemeNodeMetadata";
import {Scene} from "@babylonjs/core/scene";
import {SchemeUI} from "../../data/ui/SchemeUI";
import {NodeMesh} from "../../data/ui/NodeMesh";
import {RibMesh} from "../../data/ui/RibMesh";
import IoC from "../../infrastructure/ioc/IoC";
import InfrastructureService from "../../services/infrastructure/InfrastructureService";
import {INFRASTRUCTURE_SERVICE} from "../../infrastructure/ioc/ServiceTypes";

export const buildSchemeUIAsync = async (scheme: Scheme, scene: Scene, camera: ArcRotateCamera, schemeMode: SchemeMode): Promise<SchemeUI> => {
    const ribs = new Array<SchemeNodeMetadata>()
    const nodeMeshes = new Array<NodeMesh>();
    const ribMeshes = new Array<RibMesh>();

    const pointDrawingLineComplete = new Array<string>()

    let constructNode: Function;
    let constructRib: Function;

    switch (schemeMode) {
        case SchemeMode.Topology:
            constructNode = constructTopologyNode
            constructRib = constructTopologyRib
            break;
        case SchemeMode.RibGeometry:
            constructNode = constructGeometryNode
            constructRib = constructGeometryRib
            break;
    }

    const infrastructureService = IoC.get<InfrastructureService>(INFRASTRUCTURE_SERVICE);
    let parent = new Mesh("parent", scene);

    for (const node of scheme.nodes) {
        const nodeId = node.id.toString();

        const nodeMaterial = infrastructureService.resources.materials.nodeMaterial;
        const nodeBaseMesh = infrastructureService.resources.baseMeshes.nodeBaseMesh;
        const nodeMesh: Mesh = constructNode(scene, nodeId, nodeMaterial, nodeBaseMesh);
        nodeMesh.setParent(parent)

        nodeMeshes.push({
            mesh: nodeMesh,
            nodeId: nodeId
        })

        //attachOwnPointerDragBehavior(nodeMesh, scene);

        const xyScale = 100;
        const zScale = 10;
        nodeMesh.position.x = node.point.x / xyScale
        nodeMesh.position.y = node.point.z / zScale
        nodeMesh.position.z = node.point.y / xyScale

        const nodesIdToDrawingLine = node
            .linkedNodes
            .filter(value => !pointDrawingLineComplete.includes(value));

        const linkedRibsMetadata = new Array<SchemeNodeMetadata>()

        const nodePoint = node.point;
        const nodeVector = new Vector3(nodePoint.x / xyScale, nodePoint.z / zScale, nodePoint.y / xyScale);

        if (nodesIdToDrawingLine.length > 0) {
            for (const linkedNodeId of nodesIdToDrawingLine) {
                const linkedNode = scheme.nodes.find(x => x.id === linkedNodeId) as Node

                if (!linkedNode)
                    continue

                const linkedNodePoint = linkedNode.point
                const linkedNodeVector = new Vector3(linkedNodePoint.x / xyScale, linkedNodePoint.z / zScale, linkedNodePoint.y / xyScale);

                const ribMaterial = infrastructureService.resources.materials.ribMaterial;
                const rib: Mesh = constructRib(scene, nodeVector, linkedNodeVector, ribMaterial);

                ribMeshes.push({
                    node1Id: linkedNodeId,
                    node2Id: nodeId,
                    mesh: rib,
                    node1Point: nodeVector,
                    node2Point: linkedNodeVector
                })

                const nodeMetadata = {mesh: rib, nodeVector: nodeVector, linkedNodeVector: linkedNodeVector};
                ribs.push(nodeMetadata)
                linkedRibsMetadata.push(nodeMetadata)
                //attachOwnPointerDragBehavior(rib, scene)
            }

            const ribData = ribs.filter(r => r.linkedNodeVector.x === nodeVector.x
                && r.linkedNodeVector.y === nodeVector.y
                && r.linkedNodeVector.z === nodeVector.z)

            for (const data of ribData) {
                linkedRibsMetadata.push({
                    mesh: data.mesh,
                    nodeVector: nodeVector,
                    linkedNodeVector: data.nodeVector
                })
            }

            nodeMesh.metadata = {
                linkedRibsMetadata
            }

            pointDrawingLineComplete.push(node.id)
        }
    }

    // for (const mesh of nodeMeshes) {
    //     // @ts-ignore
    //     const _sx = 1 / mesh.mesh.scaling.x;
    //     const _sy = 1 / mesh.mesh.scaling.y;
    //     const _sz = 3 / mesh.mesh.scaling.z;
    //
    //     mesh.mesh.scaling.z = 1;
    //
    //     const pivotPoint = new Vector3(-41, -41, 29);
    //
    //     mesh.mesh.position = new Vector3(pivotPoint.x + _sx * (mesh.mesh.position.x - pivotPoint.x),
    //         pivotPoint.y + _sy * (mesh.mesh.position.y - pivotPoint.y),
    //         pivotPoint.z + _sz * (mesh.mesh.position.z - pivotPoint.z));
    //
    //
    //     mesh.mesh.computeWorldMatrix();
    //}

    // for (const rib of nodeMeshes) {
    //     // @ts-ignore
    //     const _sx = 1 / rib.mesh.scaling.x;
    //     const _sy = 1 / rib.mesh.scaling.y;
    //     const _sz = 3 / rib.mesh.scaling.z;
    //
    //     const mesh = rib.mesh;
    //
    //     const pivotPoint = new Vector3(-41, -41, 29);
    //
    //     const matrix = mesh.computeWorldMatrix(true);  // force calculation of world matrix
    //     const local_pos = new Vector3(0, 0, 0); //top middle of box relative to box
    //     local_pos.addInPlace(new Vector3(1, 1, 1)); //translate by (1, 1, 1)
    //     const global_pos = Vector3.TransformCoordinates(local_pos, matrix); //calculate world position
    //     sphere.position = global_pos; //position sphere relative to world
    //
    //     const path =
    //
    //     // @ts-ignore
    //     const scaledTube = Mesh.CreateTube(null, path,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         rib.mesh);
    //
    //     rib.mesh.position = new Vector3(pivotPoint.x + _sx * (rib.mesh.position.x - pivotPoint.x),
    //         pivotPoint.y + _sy * (rib.mesh.position.y - pivotPoint.y),
    //         pivotPoint.z + _sz * (rib.mesh.position.z - pivotPoint.z));
    //
    //
    //     rib.mesh.computeWorldMatrix();
    // }

    return {
        nodes: nodeMeshes,
        ribs: ribMeshes,
        parent: parent
    }
}