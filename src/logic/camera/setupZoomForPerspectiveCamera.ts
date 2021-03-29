import {Vector3D} from "../../data/base/Vector3D";
import {ArcRotateCamera, Plane, Vector2, Scene, Vector3, PointerEventTypes, Matrix, Epsilon} from "@babylonjs/core";

export function setupZoomForPerspectiveCamera(scene: Scene, camera: ArcRotateCamera, centralVector: Vector3D) {
    camera.inertia = 0.3;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 1000;
    camera.upperBetaLimit = Math.PI - 0.1;
    camera.angularSensibilityX = camera.angularSensibilityY = 1500;

    updateHitPlane(scene, camera, centralVector);

    const inertialPanning = Vector3.Zero();
    
    const inertialPanningFn = () => {
        if (inertialPanning.x !== 0 || inertialPanning.y !== 0 || inertialPanning.z !== 0) {
            camera.target.addInPlace(inertialPanning);
            inertialPanning.scaleInPlace(camera.inertia);
            zeroIfClose(inertialPanning);
        }
    };

    const wheelPrecisionFn = () => {
        camera.wheelPrecision = 1 / camera.radius * 1000;
    };

    const zoomFn = (p: any) => {
        const delta = zoomWheel(p,camera);
        zooming(delta, scene, camera, inertialPanning);
    }

    const prvScreenPos = Vector2.Zero();
    const rotateFn = () => {
        rotating(scene, camera, prvScreenPos);
    };

    const removeObservers = () => {
        updateHitPlane(scene, camera, centralVector);
        scene.onPointerObservable.removeCallback(rotateFn);
    }

    scene.onPointerObservable.add((p) => {
        removeObservers();
        if (p.event.button === 0) {
            updateHitPlane(scene, camera, centralVector);
            prvScreenPos.copyFromFloats(scene.pointerX, scene.pointerY);
            scene.onPointerObservable.add(rotateFn, PointerEventTypes.POINTERMOVE);
        }
    }, PointerEventTypes.POINTERDOWN);

    scene.onPointerObservable.add((p, e) => {
        removeObservers();
    }, PointerEventTypes.POINTERUP);

    scene.onPointerObservable.add(zoomFn, PointerEventTypes.POINTERWHEEL);
    scene.onBeforeRenderObservable.add(inertialPanningFn);
    scene.onBeforeRenderObservable.add(wheelPrecisionFn);

    // stop context menu showing on canvas right click
    // @ts-ignore
    scene.getEngine().getRenderingCanvas().addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}

function updateHitPlane(scene: Scene, camera: ArcRotateCamera, centralVector: Vector3D)
{
    
    var direction = camera.target.subtract(camera.position)
    // @ts-ignore
    camera.hitplane = Plane.FromPositionAndNormal(centralVector, direction);
    
    var motion = 0.0 + camera.inertialAlphaOffset + camera.inertialBetaOffset + camera.inertialRadiusOffset;
    if (motion)
    {
        // still moving, so tricker another update in a little bit.  Unfortunately the camera has no 
        // callback when it has finished moving.
        window.setTimeout(() => {updateHitPlane(scene, camera, centralVector), 100});
    }
}

// Get pos on plane
function getPosition(scene: Scene, camera: ArcRotateCamera) {

    var direction = camera.target.subtract(camera.position);
    direction.normalize();

    // to stop degenerate behavior when camera is aligned with a plane where hit detection shoots
    // off to infinity, we take the closest distance to any of the 3 x-y-z planes.
    var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera, false);
    // @ts-ignore
    const distance = ray.intersectsPlane(camera.hitplane);
    
    // not using this ray again, so modifying its vectors here is fine
    // @ts-ignore
    return ray.origin.addInPlace(ray.direction.scaleInPlace(distance));
}

// Get the wheel delta divided by the camera wheel precision.
function zoomWheel(p: any, camera: ArcRotateCamera) {
    const event = p.event;
    event.preventDefault();
    let wheelDelta = 0;
    if (event.wheelDelta) {
        wheelDelta = event.wheelDelta;
    } else {
        wheelDelta = -(event.deltaY || event.detail) * 60;
    }
    var delta = wheelDelta / (camera.wheelPrecision * 10);
    return delta;
}

// Zoom to pointer position. Zoom amount determined by delta.
function zooming(delta: number, scene: Scene, camera: ArcRotateCamera, ref: Vector3) {
    // @ts-ignore
    if (camera.radius - camera.lowerRadiusLimit < 1 && delta > 0) {
        return;
    // @ts-ignore    
    } else if (camera.upperRadiusLimit - camera.radius < 1 && delta < 0) {
        return;
    }
    const inertiaComp = 1 - camera.inertia;
    if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp <
    // @ts-ignore
            camera.lowerRadiusLimit) {
                // @ts-ignore
        delta = (camera.radius - camera.lowerRadiusLimit) * inertiaComp - camera.inertialRadiusOffset;
    } else if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp >
    // @ts-ignore
                camera.upperRadiusLimit) {
    // @ts-ignore
        delta = (camera.radius - camera.upperRadiusLimit) * inertiaComp - camera.inertialRadiusOffset;
    }

    const zoomDistance = delta / inertiaComp;
    const ratio = zoomDistance / camera.radius;
    const vec = getPosition(scene, camera);

    const directionToZoomLocation = vec.subtract(camera.target);
    const offset = directionToZoomLocation.scale(ratio);

    offset.scaleInPlace(inertiaComp);
    ref.addInPlace(offset);

    camera.inertialRadiusOffset += delta;
}

// Rotate the camera
function rotating(scene: Scene, camera: ArcRotateCamera, prvScreenPos: Vector2) {
    const offsetX = scene.pointerX - prvScreenPos.x;
    const offsetY = scene.pointerY - prvScreenPos.y;
    prvScreenPos.copyFromFloats(scene.pointerX, scene.pointerY);
    changeInertialAlphaBetaFromOffsets(offsetX, offsetY, camera);
}

// Modifies the camera's inertial alpha and beta offsets.
function changeInertialAlphaBetaFromOffsets(offsetX: number, offsetY: number, camera: ArcRotateCamera) {
    const alphaOffsetDelta = offsetX / camera.angularSensibilityX;
    const betaOffsetDelta = offsetY / camera.angularSensibilityY;
    camera.inertialAlphaOffset -= alphaOffsetDelta;
    camera.inertialBetaOffset -= betaOffsetDelta;
}

// Sets x y or z of passed in vector to zero if less than Epsilon.
function zeroIfClose(vec: Vector3) {
    if (Math.abs(vec.x) < Epsilon) {
        vec.x = 0;
    }
    if (Math.abs(vec.y) < Epsilon) {
        vec.y = 0;
    }
    if (Math.abs(vec.z) < Epsilon) {
        vec.z = 0;
    }
}