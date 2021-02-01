import {AbstractMesh, Mesh, PointerDragBehavior, Vector3} from "@babylonjs/core";
import SchemeNodeMetadata from "../../../views/types/SchemeNodeMetadata";
import constructTopologyRib from "../construction/rib/constructTopologyRib";
import {Scene} from "@babylonjs/core/scene";

/**
 * will attach an own PointerDragBehavoir to a given mesh
 * pointerDragBehavoir can only hold one attached mesh (attachedNode-property),
 * so this function will create 'unique' pointerDragBehavoirs and add them the the mesh
 */
const attachOwnPointerDragBehavior = (mesh: Mesh, scene: Scene) => {
    // Create pointerDragBehavior in the desired mode
    const pointerDragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0, 1, 0)});

    // If handling drag events manually is desired, set move attached to false
    pointerDragBehavior.moveAttached = false;

    // Use drag plane in world space
    pointerDragBehavior.useObjectOrientationForDragging = false;

    let handleNodes = new Array<AbstractMesh>()

    scene.registerBeforeRender(function () {
        for (const node of handleNodes) {
            if (node.metadata) {
                const {linkedRibsMetadata} = node.metadata

                for (const meta of linkedRibsMetadata) {
                    const linkedNodeVector = meta.linkedNodeVector.clone()
                    const nodeVector = meta.nodeVector

                    const nodePoint = node.position.clone()

                    let endNode: Vector3
                    let startNode: Vector3
                    if(Vector3.Distance(nodeVector, nodePoint) < Vector3.Distance(linkedNodeVector, nodePoint)){
                        endNode = linkedNodeVector
                        startNode =  nodePoint
                    }
                    else{
                        endNode = nodePoint
                        startNode =  nodeVector.clone()
                    }

                    // @ts-ignore
                    meta.mesh = Mesh.CreateTube(null,
                        [startNode, endNode],
                        0.02,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        meta.mesh)

                    meta.nodeVector = startNode
                    meta.linkedNodeVector = endNode
                }
            }
        }
        handleNodes = new Array<Mesh>()
    });

    // Listen to drag events
    pointerDragBehavior.onDragStartObservable.add((event) => {
        const attachedNode = pointerDragBehavior.attachedNode
        attachedNode.visibility = 0.5
    })
    pointerDragBehavior.onDragObservable.add((event) => {
        const deltaX = event.delta.x
        const deltaZ = event.delta.z
        const deltaY = event.delta.y

        //attachedNode could be also mesh here again...
        const attachedNode = pointerDragBehavior.attachedNode

        attachedNode.position.x += deltaX
        attachedNode.position.z += deltaZ
        attachedNode.position.y += deltaY

        if (attachedNode.metadata)
            handleNodes.push(attachedNode)
    })
    pointerDragBehavior.onDragEndObservable.add((event) => {
        const attachedNode = pointerDragBehavior.attachedNode;
        attachedNode.visibility = 1
    })

    mesh.addBehavior(pointerDragBehavior);
}

export default attachOwnPointerDragBehavior