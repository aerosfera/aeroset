import * as BABYLON from 'babylonjs';
import {ArcRotateCamera} from "babylonjs/Cameras/arcRotateCamera";

export default function setupCamera(canvas: HTMLCanvasElement, scene: BABYLON.Scene): ArcRotateCamera {
    const camera: ArcRotateCamera = new BABYLON.ArcRotateCamera('Camera', 0, 0, -100, new BABYLON.Vector3(1, 2, -3), scene);

    camera.setPosition(new BABYLON.Vector3(0, 0, -100));
    camera.target = new BABYLON.Vector3(0, 0, 0);
    camera.orthoLeft = -8;
    camera.orthoRight = 8;
    const ratio = canvas.height / canvas.width;
    camera.orthoTop = camera.orthoRight * ratio;
    camera.orthoBottom = camera.orthoLeft * ratio;

    camera.attachControl(canvas, false);
    camera.alpha += Math.PI; // camera +180°
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    camera.wheelPrecision = 100.0;
    camera.pinchPrecision = 30;
    camera.minZ = 0.01;
    camera.maxZ = 1000;

    camera.lowerRadiusLimit = camera.radius;
    camera.upperRadiusLimit = camera.radius;
    return camera;
}