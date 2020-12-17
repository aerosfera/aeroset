import Scheme from "../../../../../models/scheme/Scheme";
import Node from "../../../../../models/scheme/Node";
import {
    Mesh,
    Vector3,
} from "@babylonjs/core";
import {SchemeMode} from "../../../../types/SchemeMode";
import constructGeometryNode from "./construction/node/constructGeometryNode";
import constructTopologyNode from "./construction/node/constructTopologyNode";
import constructTopologyRib from "./construction/rib/constructTopologyRib";
import constructGeometryRib from "./construction/rib/constructGeometryRib";
import {GuiEngineData} from "../../../../types/DelayedInitialization";
import attachOwnPointerDragBehavior from "./behaviors/pointerDragBehavior";

export const constructScheme = async (scheme: Scheme, engineData: GuiEngineData, schemeMode: SchemeMode): Promise<void> => {
    const {scene} = engineData

    const nodes = new Array<Mesh>()
    const ribs = new Array<Mesh>()

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

    for (const node of scheme.nodes) {
        const nodeId = node.id.toString();

        const nodeMesh: Mesh = constructNode(scene, nodeId)
        nodes.push(nodeMesh)
        attachOwnPointerDragBehavior(nodeMesh);

        nodeMesh.position.x = node.point.x / 150
        nodeMesh.position.y = node.point.y / 150
        nodeMesh.position.z = node.point.z / 10

        const nodesIdToDrawingLine = node
            .linkedNodes
            .filter(value => !pointDrawingLineComplete.includes(value));

        if (nodesIdToDrawingLine.length > 0) {
            const nodePoint = node.point;
            const nodeVector = new Vector3(nodePoint.x / 150, nodePoint.y / 150, nodePoint.z / 10);

            for (const linkedNodeId of nodesIdToDrawingLine) {
                const linkedNode = scheme.nodes.find(x => x.id === linkedNodeId) as Node

                if (!linkedNode)
                    continue

                const linkedNodePoint = linkedNode.point
                const linkedNodeVector = new Vector3(linkedNodePoint.x / 150, linkedNodePoint.y / 150, linkedNodePoint.z / 10);

                const rib: Mesh = constructRib(scene, nodeVector, linkedNodeVector)
                ribs.push(rib)
                attachOwnPointerDragBehavior(rib);
            }

            pointDrawingLineComplete.push(node.id)
        }
    }
}