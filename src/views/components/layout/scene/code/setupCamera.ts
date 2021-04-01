import {ArcRotateCamera, Camera, Matrix, Plane, Scene, Vector3} from "@babylonjs/core";
import {PickingInfo} from "@babylonjs/core/Collisions/pickingInfo";

ArcRotateCamera.prototype._getViewMatrix = function () {

    var cosa = Math.cos(this.alpha);
    var sina = Math.sin(this.alpha);
    var cosb = Math.cos(this.beta);
    var sinb = Math.sin(this.beta);
    
    if (sinb === 0) {
        sinb = 0.0001;
    }
    // @ts-ignore
    var target = this._getTargetPosition();
    // @ts-ignore
    target.addToRef(new Vector3(this.radius * cosa * sinb, this.radius * cosb, this.radius * sina * sinb), this._newPosition);
    if (this.getScene().collisionsEnabled && this.checkCollisions) {
        // @ts-ignore
        this._collider.radius = this.collisionRadius;
        // @ts-ignore
        this._newPosition.subtractToRef(this.position, this._collisionVelocity);
        // @ts-ignore
        this._collisionTriggered = true;
        // @ts-ignore
        this.getScene().collisionCoordinator.getNewPosition(this.position, this._collisionVelocity, this._collider, 3, null, this._onCollisionPositionChange, this.uniqueId);
    }
    else {
        // @ts-ignore
        this.position.copyFrom(this._newPosition);
        var up = this.upVector;
        if (this.allowUpsideDown && this.beta < 0) {
            up = up.clone();
            up = up.negate();
        }
        
        if (this.radius < 0) {
            
            var vec = this.position.subtract(target);
            vec.normalize();
            
            Matrix.LookAtLHToRef(this.position, this.position.add(vec), up, this._viewMatrix);
            
        } else {

            Matrix.LookAtLHToRef(this.position, target, up, this._viewMatrix);
        }
        // @ts-ignore
        this._viewMatrix.m[12] += this.targetScreenOffset.x;
        // @ts-ignore
        this._viewMatrix.m[13] += this.targetScreenOffset.y;
        
    }
    return this._viewMatrix;
};

const setupCamera = (canvas: HTMLCanvasElement, scene: Scene): ArcRotateCamera => {
    const camera : ArcRotateCamera = new ArcRotateCamera('Camera', 0, 0, -100, new Vector3(1, 2, -3), scene);

    camera.setPosition(new Vector3(0, 0, -100));
    camera.target = new Vector3(0, 0, 0);
    camera.panningSensibility = 200;
    camera.orthoLeft = -8;
    camera.orthoRight = 8;
    const ratio = canvas.height / canvas.width;
    camera.orthoTop = camera.orthoRight * ratio;
    camera.orthoBottom = camera.orthoLeft * ratio;
    camera.inputs.addMouseWheel();

    camera.attachControl(canvas, false);
    camera.alpha += Math.PI; // camera +180°
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    camera.wheelPrecision = 100.0;
    camera.pinchPrecision = 30;
    camera.minZ = 0.01;
    camera.maxZ = 1000;

    camera.lowerRadiusLimit = 20;
    camera.upperRadiusLimit = 20;

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