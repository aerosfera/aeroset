import Scheme from "../../../../../models/scheme/Scheme";
import Node from "../../../../../models/scheme/Node";
import {Scene} from "@babylonjs/core/scene";
import {
    Color3,
    Color4, FloatArray, Mesh,
    MeshBuilder, Nullable, PointerEventTypes,
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

    // const sceneSPS: SolidParticleSystem = new SolidParticleSystem("SceneSPS", scene, {
    //     updatable: true,
    //     isPickable: true
    // });

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
            }

            pointDrawingLineComplete.push(node.id)
        }
    }

    // sceneSPS.buildMesh()
    //
    // sceneSPS.initParticles = function () {
    //     for (let i = 0; i < sceneSPS.nbParticles; i++) {
    //         const node = scheme.nodes[i]
    //
    //         const point = sceneSPS.particles[i]
    //         point.position.x = node.point.x / 150
    //         point.position.y = node.point.y / 150
    //         point.position.z = node.point.z / 10
    //
    //         point.color = new Color4(3, 3, 3, 1)
    //     }
    // }
    // sceneSPS.initParticles();
    // sceneSPS.setParticles();
    // sceneSPS.refreshVisibleSize();

    let selected: any = null;
    const pointerCacheA = new Vector2(0, 0);
    const pointerCacheB = new Vector2(0, 0);
    const pointerMoveLimit = 8;

    // sceneSPS.setParticles(); // initial SPS draw
    // sceneSPS.refreshVisibleSize(); // force the BBox recomputation
    // scene.onPointerDown = function (evt, pickResult) {
    //     var meshFaceId = pickResult.faceId; // get the mesh picked face
    //     if (meshFaceId == -1) {
    //         return;
    //     } // return if nothing picked
    //     var picked = sceneSPS.pickedParticle(pickResult); // get the picked particle data : idx and faceId
    //     // @ts-ignore
    //     var idx = picked.idx;
    //     var p = sceneSPS.particles[idx];
    //     // get the actual picked particle
    //
    //     // @ts-ignore
    //     p.color.r = 1; // turn it red
    //     // @ts-ignore
    //     p.color.b = 0;
    //     // @ts-ignore
    //     p.color.g = 0;
    //     p.velocity.y = -1; // drop it
    //     sceneSPS.setParticles();
    // };

    var matColors=[];
    var boxmat=[];
    var currentMesh : Mesh;
    var nearestMesh : Mesh;
    var currentIndex;
    var startingPoint : any;

    var getGroundPosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY);
        // @ts-ignore
        if (pickinfo.hit) {
            // @ts-ignore
            return pickinfo.pickedPoint;
        }
        return null;
    }

    var latestGoodPosition = new Vector3();

    // @ts-ignore
    var onPointerDown = function (evt) {
        if (evt.button !== 0) {
            return;
        }

        // check if we are under a mesh
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        // @ts-ignore
        if (pickInfo.hit) {

            // identify which box was clickd and set visibility to 0.5
            // @ts-ignore
            currentMesh = pickInfo.pickedMesh;
            currentMesh.visibility = 0.5;

            // record current position as being last good position
            // @ts-ignore
            currentIndex=currentMesh.index;
            latestGoodPosition.x = currentMesh.position.x;
            latestGoodPosition.y = currentMesh.position.y;
            latestGoodPosition.z = currentMesh.position.z;

            // @ts-ignore
            startingPoint = getGroundPosition(evt);
            if (startingPoint) {
                setTimeout(function () {camera.detachControl(canvas);}, 0);
            }
        }
    }

    var onPointerUp = function () {

        if (startingPoint) {
            camera.attachControl(canvas, true);
            if (currentMesh){
                currentMesh.visibility=1;
            }
            startingPoint = null;
            return;
        }
    }

    // @ts-ignore
    var onPointerMove = function (evt) {
        if (!startingPoint) {
            return;
        }

        // CHECK COLLISION
        if (currentMesh){
            currentMesh.computeWorldMatrix(true);

            // @ts-ignore
            var current = getGroundPosition(evt);
            if (!current) {
                return;
            }

            var diff = current.subtract(startingPoint);
            currentMesh.position.addInPlace(diff);
            startingPoint = current;
        }
        return;
    }

    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("pointermove", onPointerMove, false);


    // scene.onPointerObservable.add(function(evt){
    //     switch(evt.type){
    //         case PointerEventTypes.POINTERDOWN:
    //             pointerCacheA.copyFromFloats(evt.event.clientX, evt.event.clientY);
    //             break;
    //
    //         case PointerEventTypes.POINTERUP:
    //             pointerCacheB.copyFromFloats(evt.event.clientX, evt.event.clientY);
    //             if(Vector2.Distance(pointerCacheA, pointerCacheB) > pointerMoveLimit) return;
    //             if(selected) {
    //                 selected.material.diffuseColor = Color3.White();
    //                 selected = null;
    //             }
    //             // @ts-ignore
    //             if(evt.pickInfo.hit && evt.pickInfo.pickedMesh && evt.event.button === 0){
    //                 // @ts-ignore
    //                 selected = evt.pickInfo.pickedMesh;
    //                 // @ts-ignore
    //                 evt.pickInfo.pickedMesh.material.diffuseColor = Color3.Green();
    //             }
    //             break;
    //
    //     }
    // }, PointerEventTypes.POINTERDOWN + PointerEventTypes.POINTERUP);
}