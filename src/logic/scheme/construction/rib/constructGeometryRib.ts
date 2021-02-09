import {Scene} from "@babylonjs/core/scene";
import {Color3, Matrix, Mesh, MeshBuilder, Quaternion, StandardMaterial, Vector3} from "@babylonjs/core";

export const constructGeometryRib = (scene: Scene, nodeVector: Vector3, linkedNodeVector: Vector3): Mesh | null => {
    const rib = constructCuboid(scene, nodeVector, linkedNodeVector);
    return rib;
}

const constructCuboid = (scene: Scene, from: Vector3, to: Vector3): Mesh => {
    const vectorStart = from;
    const vectorEnd = to;
    const distance = Vector3.Distance(vectorStart, vectorEnd);

    const box = MeshBuilder.CreateBox("box", {width: 0.1, height: distance, depth: 0.1}, scene);

    const mid = Vector3.Lerp(vectorStart, vectorEnd, 0.5);

    // Then move the box to red sphere
    box.position = mid;

    // Then find the vector between spheres
    const v1 = vectorEnd.subtract(vectorStart);
    v1.normalize();
    const v2 = new Vector3(0, 1, 0);

    // Using cross we will have a vector perpendicular to both vectors
    const axis = Vector3.Cross(v1, v2);
    axis.normalize();
    console.log(axis);

    // Angle between vectors
    const angle = Math.acos(Vector3.Dot(v1, v2));
    console.log(angle);

    // Then using axis rotation the result is obvious
    box.rotationQuaternion = Quaternion.RotationAxis(axis, -angle);

    return box;
}

export default constructGeometryRib