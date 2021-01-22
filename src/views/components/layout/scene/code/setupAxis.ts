import {AbstractMesh, Color3, DynamicTexture, Mesh, Scene, StandardMaterial, Vector3} from "@babylonjs/core";

export default function setupAxis(sceneBase: Scene, size: number, vector: Vector3): AbstractMesh[] {

    const makeTextPlane = function (text: string, color: string, size: number, scene: Scene) {
        const dynamicTexture = new DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
        const plane = mesh.CreatePlane("TextPlane", size, scene, true);
        let standardMaterial: StandardMaterial = new StandardMaterial("TextPlaneMaterial", scene);
        standardMaterial.specularColor = new Color3(0, 0, 0);
        standardMaterial.diffuseTexture = dynamicTexture;
        plane.material = standardMaterial;
        plane.material.backFaceCulling = false;
        return plane;
    };

    const mesh = Mesh;

    const axisX = mesh.CreateLines("axisX", [
        Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
    ], sceneBase);
    axisX.color = new Color3(1, 0, 0);
    const xChar = makeTextPlane("X", "red", size / 10, sceneBase);
    xChar.position = new Vector3(vector.x + 0.9 * size, vector.y + -0.05 * size, vector.z);
    const axisY = mesh.CreateLines("axisY", [
        Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
        new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
    ], sceneBase);
    axisY.color = new Color3(0, 1, 0);
    const yChar = makeTextPlane("Y", "green", size / 10, sceneBase);
    yChar.position = new Vector3(vector.x, vector.y + 0.9 * size, vector.z + -0.05 * size);
    const axisZ = mesh.CreateLines("axisZ", [
        Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
        new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
    ], sceneBase);
    axisZ.color = new Color3(0, 0, 1);
    const zChar = makeTextPlane("Z", "blue", size / 10, sceneBase);
    zChar.position = new Vector3(vector.x, vector.y + 0.05 * size, vector.z + 0.9 * size);

    axisX.position = vector;
    axisY.position = vector;
    axisZ.position = vector;
    return [axisX, axisY, axisZ];
}