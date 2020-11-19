import {ArcRotateCamera, Camera, Scene, Vector3} from "@babylonjs/core";

export default function setupCamera(canvas: HTMLCanvasElement, scene: Scene): ArcRotateCamera {
    const camera: ArcRotateCamera = new ArcRotateCamera('Camera', 0, 0, -100, new Vector3(1, 2, -3), scene);

    camera.setPosition(new Vector3(0, 0, -100));
    camera.target = new Vector3(0, 0, 0);
    camera.orthoLeft = -8;
    camera.orthoRight = 8;
    const ratio = canvas.height / canvas.width;
    camera.orthoTop = camera.orthoRight * ratio;
    camera.orthoBottom = camera.orthoLeft * ratio;

    camera.attachControl(canvas, false);
    camera.alpha += Math.PI; // camera +180°
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    camera.wheelPrecision = 100.0;
    camera.pinchPrecision = 30;
    camera.minZ = 0.01;
    camera.maxZ = 1000;

    camera.lowerRadiusLimit = camera.radius;
    camera.upperRadiusLimit = camera.radius;
    //camera.inputs.add(new ArcRotateCameraPointersCustomInput())
    return camera;
}