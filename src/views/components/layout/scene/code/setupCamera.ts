import {ArcRotateCamera, Camera, Matrix, Plane, Scene, Vector3} from "@babylonjs/core";
import {PickingInfo} from "@babylonjs/core/Collisions/pickingInfo";

const setupCamera = (canvas: HTMLCanvasElement, scene: Scene): ArcRotateCamera => {
    const camera: ArcRotateCamera = new ArcRotateCamera('Camera', 0, 0, -100, new Vector3(1, 2, -3), scene);

    camera.setPosition(new Vector3(0, 0, -100));
    camera.target = new Vector3(0, 0, 0);
    camera.panningSensibility = 200;
    camera.orthoLeft = -8;
    camera.orthoRight = 8;
    const ratio = canvas.height / canvas.width;
    camera.orthoTop = camera.orthoRight * ratio;
    camera.orthoBottom = camera.orthoLeft * ratio;
    camera.inputs.addMouseWheel();
    camera.attachControl(true);
    camera.alpha += Math.PI; // camera +180°
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    camera.wheelPrecision = 100.0;
    camera.pinchPrecision = 30;
    camera.minZ = 0.01;
    camera.maxZ = 1000;

    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 1000;

    let plane: Plane;
    let pickOrigin: PickingInfo;
    let isPanning = false;
    scene.onPointerDown = (evt) => {
        if (evt.ctrlKey) {
            const pickResult = scene.pick(scene.pointerX, scene.pointerY) as PickingInfo;
            if (pickResult.pickedMesh) {
                let normal = camera.position.subtract(pickResult.pickedPoint as Vector3).normalize();
                plane = Plane.FromPositionAndNormal(pickResult.pickedPoint as Vector3, normal);
                // @ts-ignore
                pickOrigin = pickResult.pickedPoint;
                isPanning = true;
                camera.detachControl(canvas);
            }
        }
    };

    scene.onPointerUp = () => {
        isPanning = false;
        camera.attachControl(canvas, true, true);
    };

    const identity = Matrix.Identity();
    scene.onPointerMove = (evt) => {
        if (isPanning) {
            let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, identity, camera, false);
            let distance = ray.intersectsPlane(plane);

            if (distance === null) {
                return;
            }
            let pickedPoint = ray.direction.scale(distance).add(ray.origin);
            // @ts-ignore
            let diff = pickedPoint.subtract(pickOrigin);
            camera.target.subtractInPlace(diff);
        }
    };

    return camera;
}

export default setupCamera