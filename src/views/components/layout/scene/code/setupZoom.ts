import {ArcRotateCamera, Camera, Engine, PointerEventTypes, Scene, Vector3} from "@babylonjs/core";

let totalZoom = 0;
let zoomTarget: Vector3 | null = null;

export const CanvasZoom = (deltaValue: any, camera: Camera) => {
    const delta = (Math.max(-1, Math.min(1, (deltaValue)))) * 0.9;
    if (delta > 0 && totalZoom < 14 || delta < 0) {
        totalZoom += delta;
        zoom2DView(camera, delta, zoomTarget);
    }
}

export default function setupZoom(scene: Scene, engine: Engine, camera: Camera) {
    scene.onPointerObservable.add((eventData, _) => {
        const event = eventData.event as any;
        CanvasZoom((event.wheelDelta || -event.detail || event.deltaY), camera);
    }, PointerEventTypes.POINTERWHEEL);

    scene.onPointerObservable.add(() => {
        zoomTarget = Vector3.Unproject(
            new Vector3(scene.pointerX, scene.pointerY, 0),
            engine.getRenderWidth(),
            engine.getRenderHeight(),
            camera.getWorldMatrix(),
            camera.getViewMatrix(),
            camera.getProjectionMatrix()
        );
    }, PointerEventTypes.POINTERMOVE);
}

export const zoom2DView = (camera: Camera, delta: number, zoomTarget: Vector3 | null) => {
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