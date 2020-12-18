import Scheme from "../../../../../models/scheme/Scheme";
import Node from "../../../../../models/scheme/Node";
import {
    ArcRotateCamera,
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
import SchemeNodeMetadata from "../../../../types/SchemeNodeMetadata";

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

    let nodeZMax = 0
    let nodeZMin = 0
    let nodeXMin = 0
    let nodeXMax = 0
    let nodeYMin = 0
    let nodeYMax = 0

    for (const node of scheme.nodes) {
        const nodeId = node.id.toString();

        const nodeMesh: Mesh = constructNode(scene, nodeId)
        nodes.push(nodeMesh)
        attachOwnPointerDragBehavior(nodeMesh, scene);

        nodeMesh.position.x = node.point.x / 150
        nodeMesh.position.y = node.point.y / 150
        nodeMesh.position.z = node.point.z / 10

        const nodesIdToDrawingLine = node
            .linkedNodes
            .filter(value => !pointDrawingLineComplete.includes(value));

        const linkedRibsMetadata = new Array<SchemeNodeMetadata>()

        const nodePoint = node.point;
        const nodeVector = new Vector3(nodePoint.x / 150, nodePoint.y / 150, nodePoint.z / 10);

        if (nodesIdToDrawingLine.length > 0) {
            for (const linkedNodeId of nodesIdToDrawingLine) {
                const linkedNode = scheme.nodes.find(x => x.id === linkedNodeId) as Node

                if (!linkedNode)
                    continue

                const linkedNodePoint = linkedNode.point
                const linkedNodeVector = new Vector3(linkedNodePoint.x / 150, linkedNodePoint.y / 150, linkedNodePoint.z / 10);

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

            if (nodeMesh.position.z < nodeZMin)
                nodeZMin = nodeMesh.position.z

            if (nodeMesh.position.x < nodeXMin)
                nodeXMin = nodeMesh.position.x

            if (nodeMesh.position.z > nodeZMax)
                nodeZMax = nodeMesh.position.z

            if (nodeMesh.position.x > nodeXMax)
                nodeXMax = nodeMesh.position.x

            if (nodeMesh.position.y > nodeYMin)
                nodeYMin = nodeMesh.position.y

            if (nodeMesh.position.y > nodeYMax)
                nodeYMax = nodeMesh.position.y

        }
    }

    // const meshes = nodes.map(n => n.clone());
    // // @ts-ignore
    // const pseudoMesh = Mesh.MergeMeshes(meshes, null, true)
    //
    // // @ts-ignore
    // pseudoMesh.isVisible = false;
    // // @ts-ignore
    // pseudoMesh.computeWorldMatrix(true);
    //
    // const centerMesh = Mesh.CreateSphere('centerMesh', 10, 2, scene);
    // // @ts-ignore
    // centerMesh.position = pseudoMesh.getBoundingInfo().boundingSphere.center;
    //
    // // @ts-ignore
    // const {x, z} = pseudoMesh.getBoundingInfo().boundingBox.center;
    //

    // // arcRotateCamera.beta = 0;
    // // arcRotateCamera.alpha = -Math.PI / 2;
    // // // @ts-ignore
    // // arcRotateCamera.zoomOn([pseudoMesh]);
    //
    // // @ts-ignore
    // const w = pseudoMesh.getBoundingInfo().boundingBox.maximumWorld.x - pseudoMesh.getBoundingInfo().boundingBox.minimumWorld.x
    // // @ts-ignore
    // const h = pseudoMesh.getBoundingInfo().boundingBox.maximumWorld.z - pseudoMesh.getBoundingInfo().boundingBox.minimumWorld.z
    //

    const x = (nodeZMax + nodeZMin) / 2
    const z = (nodeXMax + nodeXMin) / 2
    const y = (nodeYMax + nodeYMin) / 2
    const arcRotateCamera = <ArcRotateCamera>camera;
    arcRotateCamera.setTarget(new Vector3(x, y, z))

     const size = Math.max(50, 50)
    camera.orthoTop = size / 2;
    camera.orthoBottom = -(size / 2);
    camera.orthoLeft = -(size / 2);
    camera.orthoRight = size / 2;
}