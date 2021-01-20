import Scheme from "../../../../../models/scheme/Scheme";
import Node from "../../../../../models/scheme/Node";
import {
    ArcRotateCamera, BoundingInfo, Color3,
    Mesh, MeshBuilder,
    Vector3,
} from "@babylonjs/core";
import {SchemeMode} from "../../../../types/SchemeMode";
import constructGeometryNode from "./construction/node/constructGeometryNode";
import constructTopologyNode from "./construction/node/constructTopologyNode";
import constructTopologyRib from "./construction/rib/constructTopologyRib";
import constructGeometryRib from "./construction/rib/constructGeometryRib";
import {GuiEngineData} from "../../../../types/DelayedInitialization";
import attachOwnPointerDragBehavior from "./behaviors/pointerDragBehavior";
import SchemeNodeMetadata from "../../../../types/SchemeNodeMetadata";
import {delay} from "../../../../../utilities/async/delay";
import {setCameraTargetToCenterOfMeshes} from "./construction/setCameraTargetToCenterOfMeshes";
import {GridMaterial} from "@babylonjs/materials";

export const constructScheme = async (scheme: Scheme, engineData: GuiEngineData, schemeMode: SchemeMode): Promise<void> => {
    const {scene, camera} = engineData

    const nodes = new Array<Mesh>()
    const ribs = new Array<SchemeNodeMetadata>()

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

        nodes.push(nodeMesh)
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

                const rib: Mesh = constructRib(scene, nodeVector, linkedNodeVector)
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

    await delay(100)
    setCameraTargetToCenterOfMeshes(parent, <ArcRotateCamera>camera)
}