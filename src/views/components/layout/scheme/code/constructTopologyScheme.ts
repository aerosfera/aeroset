import Scheme from "../../../../../models/scheme/Scheme";
import Node from "../../../../../models/scheme/Node";
import {Scene} from "@babylonjs/core/scene";
import {
    ArcRotateCamera,
    Color3,
    Color4, FloatArray, Mesh,
    MeshBuilder, Nullable, PointerDragBehavior, PointerEventTypes,
    SolidParticleSystem,
    StandardMaterial, Texture, Vector2,
    Vector3,
    VertexBuffer
} from "@babylonjs/core";
import {Point} from "../../../../../models/scheme/Point";
import {SchemeMode} from "../../../../types/SchemeMode";
import constructGeometryNode from "./construction/node/constructGeometryNode";
import constructTopologyNode from "./construction/node/constructTopologyNode";
import constructTopologyRib from "./construction/rib/constructTopologyRib";
import constructGeometryRib from "./construction/rib/constructGeometryRib";
import {GuiEngineData} from "../../../../types/DelayedInitialization";

export const constructTopologyScheme = async (scheme: Scheme, engineData: GuiEngineData, schemeMode: SchemeMode): Promise<void> => {
    const {scene, canvas, camera} = engineData

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
            }

            pointDrawingLineComplete.push(node.id)
        }
    }

    for(let i = 0; i < nodes.length; i++) {
        attachOwnPointerDragBehavior(nodes[i]);
    }

    for(let i = 0; i < ribs.length; i++) {
        attachOwnPointerDragBehavior(ribs[i]);
    }


    /**
     * will attach an own PointerDragBehavoir to a given mesh
     * pointerDragBehavoir can only hold one attached mesh (attachedNode-property),
     * so this function will create 'unique' pointerDragBehavoirs and add them the the mesh
     */
    function attachOwnPointerDragBehavior(mesh : Mesh){
        // Create pointerDragBehavior in the desired mode
        const pointerDragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0,1,0)});

        // If handling drag events manually is desired, set move attached to false
        pointerDragBehavior.moveAttached = false;

        // Use drag plane in world space
        pointerDragBehavior.useObjectOrientationForDragging = false;

        // Listen to drag events
        pointerDragBehavior.onDragStartObservable.add((event)=>{
            console.log("startDrag");
            pointerDragBehavior.attachedNode.visibility = 0.5
        })
        pointerDragBehavior.onDragObservable.add((event)=>{
            console.log("drag");

            //attachedNode could be also mesh here again...
            pointerDragBehavior.attachedNode.position.x += event.delta.x;
            pointerDragBehavior.attachedNode.position.z += event.delta.z;
        })
        pointerDragBehavior.onDragEndObservable.add((event)=>{
            console.log("endDrag");
            pointerDragBehavior.attachedNode.visibility = 1
        })

        mesh.addBehavior(pointerDragBehavior);
    }
}