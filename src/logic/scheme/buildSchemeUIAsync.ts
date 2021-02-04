import Scheme from "../../data/scheme/Scheme";
import Node from "../../data/base/Node";
import {
    ArcRotateCamera,
    Mesh,
    Vector3,
} from "@babylonjs/core";
import {SchemeMode} from "../../views/types/SchemeMode";
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


    let parent = new Mesh("parent", scene);

    for (const node of scheme.nodes) {
        const nodeId = node.id.toString();

        const nodeMesh: Mesh = constructNode(scene, nodeId)
        nodeMesh.setParent(parent)

        nodeMeshes.push({
            mesh: nodeMesh,
            nodeId: nodeId
        })

        attachOwnPointerDragBehavior(nodeMesh, scene);

        nodeMesh.position.x = node.point.x / 150
        nodeMesh.position.y = node.point.z / 10
        nodeMesh.position.z = node.point.y / 150

        const nodesIdToDrawingLine = node
            .linkedNodes
            .filter(value => !pointDrawingLineComplete.includes(value));

        const linkedRibsMetadata = new Array<SchemeNodeMetadata>()

        const nodePoint = node.point;
        const nodeVector = new Vector3(nodePoint.x / 150, nodePoint.z / 10, nodePoint.y / 150);

        if (nodesIdToDrawingLine.length > 0) {
            for (const linkedNodeId of nodesIdToDrawingLine) {
                const linkedNode = scheme.nodes.find(x => x.id === linkedNodeId) as Node

                if (!linkedNode)
                    continue

                const linkedNodePoint = linkedNode.point
                const linkedNodeVector = new Vector3(linkedNodePoint.x / 150, linkedNodePoint.z / 10, linkedNodePoint.y / 150);

                const rib: Mesh = constructRib(scene, nodeVector, linkedNodeVector);

                ribMeshes.push({
                    node1Id: linkedNodeId,
                    node2Id: nodeId,
                    mesh: rib,
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

    return {
        nodes : nodeMeshes,
        ribs : ribMeshes,
        parent : parent
    }
}