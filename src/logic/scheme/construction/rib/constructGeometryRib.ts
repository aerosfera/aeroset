import {Scene} from "@babylonjs/core/scene";
import {Mesh, MeshBuilder, Quaternion, StandardMaterial, Tools, Vector3} from "@babylonjs/core";

export const constructGeometryRib = (scene: Scene, nodeVector: Vector3, linkedNodeVector: Vector3): Mesh | null => {
    const vectorStart = nodeVector;
    const vectorEnd = linkedNodeVector;
    const ribLength = Vector3.Distance(vectorStart, vectorEnd);

    //Create rib
    const ribCuboid = MeshBuilder.CreateBox("ribCuboid", {width: 0.1, height: ribLength, depth: 0.1}, scene);
    const mid = Vector3.Lerp(vectorStart, vectorEnd, 0.5);
    ribCuboid.position = mid;

    //Get projection of vector rib
    const vectorBetweenPoints = vectorEnd.subtract(vectorStart);
    vectorBetweenPoints.normalize();

    const vectorBetweenPointsProjectionXZ = new Vector3(vectorBetweenPoints.x, 0, vectorBetweenPoints.z);
    vectorBetweenPointsProjectionXZ.normalize();

    const axisX = new Vector3(1, 0, 0);
    const axisY = new Vector3(0, 1, 0);
    const axisMinusY = new Vector3(0, -1, 0);

    //Rotate around axis Z
    const xzRotateAngle = Math.acos(Vector3.Dot(vectorBetweenPointsProjectionXZ, axisX));
    const rotateAxisXZ = Vector3.Cross(vectorBetweenPointsProjectionXZ, axisX);
    rotateAxisXZ.normalize();

    //Incline rib cuboid
    const inclineRibCuboidAngle = Math.acos(Vector3.Dot(vectorBetweenPoints, axisY));
    const inclineRibCuboidAxis = Vector3.Cross(vectorBetweenPoints, axisY);
    inclineRibCuboidAxis.normalize();

    const rotateXZAngle = Quaternion.RotationAxis(inclineRibCuboidAxis, -inclineRibCuboidAngle);
    const inclineRibCuboid = Quaternion.RotationAxis(rotateAxisXZ, -xzRotateAngle);

    //Todo: cje
    const angleDegrees = Tools.ToDegrees(inclineRibCuboidAngle);
    if (Math.abs(angleDegrees) < 2 || Math.abs(angleDegrees - 180) < 2) {
        ribCuboid.rotationQuaternion = inclineRibCuboid;
    } else {
        ribCuboid.rotationQuaternion = rotateXZAngle.multiply(inclineRibCuboid);
    }

    return ribCuboid;
}

export default constructGeometryRib