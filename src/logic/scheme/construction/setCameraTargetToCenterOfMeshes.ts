import {AbstractMesh, ArcRotateCamera, BoundingInfo, Vector3} from "@babylonjs/core";
import {Vector3D} from "../../../data/base/Vector3D";

export const setCameraTargetToCenterOfMeshes = (parentMesh: AbstractMesh, camera: ArcRotateCamera, radius: number): Vector3D => {
    let childMeshes = parentMesh.getChildMeshes();

    let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
    let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;

    for (let i = 0; i < childMeshes.length; i++) {
        let meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
        let meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;

        min = Vector3.Minimize(min, meshMin);
        max = Vector3.Maximize(max, meshMax);
    }

    const boundingInfo = new BoundingInfo(min, max);
    parentMesh.setBoundingInfo(boundingInfo);

    parentMesh.showBoundingBox = true;

    const target = boundingInfo.boundingBox.center;
    camera.setTarget(target)
    camera.radius = radius

    return {x: target.x, y: target.y, z: target.z}
}