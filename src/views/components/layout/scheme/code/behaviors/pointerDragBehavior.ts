import {Mesh, PointerDragBehavior, Vector3} from "@babylonjs/core";

/**
 * will attach an own PointerDragBehavoir to a given mesh
 * pointerDragBehavoir can only hold one attached mesh (attachedNode-property),
 * so this function will create 'unique' pointerDragBehavoirs and add them the the mesh
 */
const attachOwnPointerDragBehavior = (mesh : Mesh) =>{
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

export default attachOwnPointerDragBehavior