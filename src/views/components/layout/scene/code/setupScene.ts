import constructAxis from "./constructAxis";
import {hexToRgb} from "../../../../../utilities/color/hexToRgb";
import {Color4, Engine, Scene} from "@babylonjs/core";
import {VRExperienceHelper} from "@babylonjs/core/Cameras/VR/vrExperienceHelper";

export default (engine: Engine, canvas: HTMLCanvasElement, bgColor: string): Scene => {
    const scene: Scene = new Scene(engine);

    const colorHex = bgColor
    const color = hexToRgb(colorHex);
    if(color && color !== null)
        scene.clearColor = new Color4(color.r / 255, color.g / 255, color.b / 255, 1);

    engine.runRenderLoop(() => {
        scene.render();
    });

    canvas.onresize = function() {
        engine.resize();
    };
    window.onresize = function() {
        engine.resize();
    };

    //const helper : VRExperienceHelper = scene.createDefaultVRExperience(); //VR test
    return scene;
}


// /** Add map-like controls to an ArcRotate camera.
//  * @param {BABYLON.Scene} scene
//  * @param {module:babylonjs/Cameras/arcRotateCamera.ArcRotateCamera} camera
//  */
// function AddControls(scene, camera) {
//
//     camera.inertia = 0.2;
//     camera.lowerRadiusLimit = 1;
//     camera.upperRadiusLimit = 350;
//     // camera.upperBetaLimit = Math.PI / 2 - 0.1;
//     camera.angularSensibilityX = camera.angularSensibilityY = 500;
//
//     const plane =
//         BABYLON.Plane.FromPositionAndNormal(BABYLON.Vector3.Zero(), BABYLON.Axis.Y);
//
//     const inertialPanning = BABYLON.Vector3.Zero();
//
//     /** @type {BABYLON.Vector3} */
//     let initialPos;
//     const panningFn = () => {
//         return;
//         const pos = getPosition(scene, camera, plane);
//         panning(pos, initialPos, camera.inertia, inertialPanning);
//     };
//
//     const inertialPanningFn = () => {
//         if (inertialPanning.x !== 0 || inertialPanning.y !== 0 || inertialPanning.z !== 0) {
//             camera.target.addInPlace(inertialPanning);
//             inertialPanning.scaleInPlace(camera.inertia);
//             zeroIfClose(inertialPanning);
//         }
//     };
//
//     const wheelPrecisionFn = () => {
//         camera.wheelPrecision = 1 / camera.radius * 1000;
//     };
//
//     const zoomFn = (p, e) => {
//         const delta = zoomWheel(p, e, camera);
//         zooming(delta, scene, camera, plane, inertialPanning);
//     }
//
//     const prvScreenPos = BABYLON.Vector2.Zero();
//     const rotateFn = () => {
//         return;
//         rotating(scene, camera, prvScreenPos);
//     };
//
//     const removeObservers = () => {
//         scene.onPointerObservable.removeCallback(panningFn);
//         scene.onPointerObservable.removeCallback(rotateFn);
//     }
//
//     scene.onPointerObservable.add((p, e) => {
//         removeObservers();
//         if (p.event.button === 0) {
//             initialPos = getPosition(scene, camera, plane);
//             scene.onPointerObservable.add(panningFn, BABYLON.PointerEventTypes.POINTERMOVE);
//         } else {
//             prvScreenPos.copyFromFloats(scene.pointerX, scene.pointerY);
//             scene.onPointerObservable.add(rotateFn, BABYLON.PointerEventTypes.POINTERMOVE);
//         }
//     }, BABYLON.PointerEventTypes.POINTERDOWN);
//
//     scene.onPointerObservable.add((p, e) => {
//         removeObservers();
//     }, BABYLON.PointerEventTypes.POINTERUP);
//
//     scene.onPointerObservable.add(zoomFn, BABYLON.PointerEventTypes.POINTERWHEEL);
//
//     scene.onBeforeRenderObservable.add(inertialPanningFn);
//     scene.onBeforeRenderObservable.add(wheelPrecisionFn);
//
//     // stop context menu showing on canvas right click
//     scene.getEngine().getRenderingCanvas().addEventListener("contextmenu", (e) => {
//         e.preventDefault();
//     });
// }
//
// /** Get pos on plane.
//  * @param {BABYLON.Scene} scene
//  * @param {BABYLON.ArcRotateCamera} camera
//  * @param {BABYLON.Plane} plane
//  */
// function getPosition(scene, camera, plane) {
//     return null;
//     const ray = scene.createPickingRay(
//         scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera, false);
//     const distance = ray.intersectsPlane(plane);
//
//     // not using this ray again, so modifying its vectors here is fine
//     return distance !== null ?
//         ray.origin.addInPlace(ray.direction.scaleInPlace(distance)) : null;
// }
//
// /** Return offsets for inertial panning given initialize and current
//  * pointer positions.
//  * @param {BABYLON.Vector3} newPos
//  * @param {BABYLON.Vector3} initialPos
//  * @param {number} inertia
//  * @param {BABYLON.Vector3} ref
//  */
// function panning(newPos, initialPos, inertia, ref) {
//     const directionToZoomLocation = initialPos.subtract(newPos);
//     const panningX = directionToZoomLocation.x * (1 - inertia);
//     const panningZ = directionToZoomLocation.z * (1 - inertia);
//     ref.copyFromFloats(panningX, 0, panningZ);
//     return ref;
// };
//
// /** Get the wheel delta divided by the camera wheel precision.
//  * @param {BABYLON.PointerInfoPre} p
//  * @param {BABYLON.EventState} e
//  * @param {BABYLON.ArcRotateCamera} camera
//  */
// function zoomWheel(p, e, camera) {
//     const event = p.event;
//     event.preventDefault();
//     let delta = event.wheelDelta;
//     //if (event.deltaY) {
//     //    delta = -event.deltaY;
//     //} else if (event.wheelDelta) {
//     //    delta = event.wheelDelta;
//     //} else if (event.detail) {
//     //    delta = -event.detail;
//     //}
//     delta /= camera.wheelPrecision;
//     return delta;
// }
//
// /** Zoom to pointer position. Zoom amount determined by delta.
//  * @param {number} delta
//  * @param {BABYLON.Scene} scene
//  * @param {BABYLON.ArcRotateCamera} camera
//  * @param {BABYLON.Plane} plane
//  * @param {BABYLON.Vector3} ref
//  */
// function zooming(delta, scene, camera, plane, ref) {
//     // if (camera.radius - camera.lowerRadiusLimit < 1 && delta > 0) {
//     //     return;
//     // } else if (camera.upperRadiusLimit - camera.radius < 1 && delta < 0) {
//     //     return;
//     // }
//     const inertiaComp = 1 - camera.inertia;
//     if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp < camera.lowerRadiusLimit) {
//         delta = (camera.radius - camera.lowerRadiusLimit) * inertiaComp - camera.inertialRadiusOffset;
//     } else if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp >
//         camera.upperRadiusLimit) {
//         delta = (camera.radius - camera.upperRadiusLimit) * inertiaComp - camera.inertialRadiusOffset;
//     }
//
//     const zoomDistance = delta / inertiaComp;
//     const ratio = zoomDistance / camera.radius;
//     const vec = getPosition(scene, camera, plane);
//
//     if (vec !== undefined && vec) {
//         const directionToZoomLocation = vec.subtract(camera.target);
//         const offset = directionToZoomLocation.scale(ratio);
//         offset.scaleInPlace(inertiaComp);
//         ref.addInPlace(offset);
//     }
//     camera.inertialRadiusOffset += delta;
// }
//
// /** Rotate the camera
//  * @param {BABYLON.Scene} scene
//  * @param {BABYLON.Vector2} prvScreenPos
//  * @param {BABYLON.ArcRotateCamera} camera
//  */
// function rotating(scene, camera, prvScreenPos) {
//     const offsetX = scene.pointerX - prvScreenPos.x;
//     const offsetY = scene.pointerY - prvScreenPos.y;
//     prvScreenPos.copyFromFloats(scene.pointerX, scene.pointerY);
//     changeInertialAlphaBetaFromOffsets(offsetX, offsetY, camera);
// }
//
// /** Modifies the camera's inertial alpha and beta offsets.
//  * @param {number} offsetX
//  * @param {number} offsetY
//  * @param {BABYLON.ArcRotateCamera} camera
//  */
// function changeInertialAlphaBetaFromOffsets(offsetX, offsetY, camera) {
//     const alphaOffsetDelta = offsetX / camera.angularSensibilityX;
//     const betaOffsetDelta = offsetY / camera.angularSensibilityY;
//     camera.inertialAlphaOffset -= alphaOffsetDelta;
//     camera.inertialBetaOffset -= betaOffsetDelta;
// }
//
// /** Sets x y or z of passed in vector to zero if less than Epsilon.
//  * @param {BABYLON.Vector3} vec
//  */
// function zeroIfClose(vec) {
//     if (Math.abs(vec.x) < BABYLON.Epsilon) {
//         vec.x = 0;
//     }
//     if (Math.abs(vec.y) < BABYLON.Epsilon) {
//         vec.y = 0;
//     }
//     if (Math.abs(vec.z) < BABYLON.Epsilon) {
//         vec.z = 0;
//     }
// }




