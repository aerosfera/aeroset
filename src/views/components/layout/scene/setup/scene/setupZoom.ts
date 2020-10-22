import {Scene} from "babylonjs/scene";
import * as BABYLON from "babylonjs";
import {Camera} from "babylonjs/Cameras/camera";
import {Vector3} from "babylonjs/Maths/math.vector";
import {Engine} from "babylonjs/Engines/engine";
import {ArcRotateCamera} from "babylonjs/Cameras/arcRotateCamera";

export default function setupZoom(scene: Scene, engine: Engine, camera: Camera){
    let totalZoom = 0;
    let zoomTarget : Vector3|null = null;

    scene.onPointerObservable.add((eventData,_) => {
        const event = eventData.event as any;
        const delta = (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail || event.deltaY)))) * 0.9;
        if (delta > 0 && totalZoom < 14 || delta < 0) {
            totalZoom += delta;
            zoom2DView(camera, delta, zoomTarget);
        }
    }, BABYLON.PointerEventTypes.POINTERWHEEL);
    scene.onPointerObservable.add(() => {
        zoomTarget = BABYLON.Vector3.Unproject(
            new BABYLON.Vector3(scene.pointerX, scene.pointerY, 0),
            engine.getRenderWidth(),
            engine.getRenderHeight(),
            camera.getWorldMatrix(),
            camera.getViewMatrix(),
            camera.getProjectionMatrix()
        );
    }, BABYLON.PointerEventTypes.POINTERMOVE);
}

function zoom2DView(camera : Camera, delta : number, zoomTarget : Vector3|null){
    const zoomingOut = delta < 0;

    if (zoomTarget) {
        const totalX = Math.abs(camera.orthoLeft! - camera.orthoRight!);
        const totalY = Math.abs(camera.orthoTop! - camera.orthoBottom!);

        const aspectRatio = totalY / totalX;

        {
            const fromCoord = camera.orthoLeft! - zoomTarget.x;
            const ratio = fromCoord / totalX;
            camera.orthoLeft! -= ratio * delta;
        }

        {
            const fromCoord = camera.orthoRight! - zoomTarget.x;
            const ratio = fromCoord / totalX;
            camera.orthoRight! -= ratio * delta;
        }

        {
            const fromCoord = camera.orthoTop! - zoomTarget.y;
            const ratio = fromCoord / totalY;
            camera.orthoTop! -= ratio * delta * aspectRatio;
        }

        {
            const fromCoord = camera.orthoBottom! - zoomTarget.y;
            const ratio = fromCoord / totalY;
            camera.orthoBottom! -= ratio * delta * aspectRatio;
        }

        // decrease pan sensitivity the closer the zoom level.
        (camera as ArcRotateCamera).panningSensibility = 6250 / Math.abs(totalX / 2);
    }
};