import {AbstractMesh, ArcRotateCamera, BoundingInfo, Vector3} from "@babylonjs/core";

export const setCameraTargetToCenterOfMeshes = (parentMesh: AbstractMesh, camera: ArcRotateCamera, radius: number) => {
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

    camera.setTarget(boundingInfo.boundingBox.center)
    camera.radius = radius
}