import * as BABYLON from "babylonjs";
import {StandardMaterial} from "babylonjs/Materials/standardMaterial";

export default function setupAxis(sceneBase : BABYLON.Scene,  size:number){

    const makeTextPlane = function (text: string, color: string, size: number, scene: BABYLON.Scene) {
        const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
        const plane = mesh.CreatePlane("TextPlane", size, scene, true);
        let standardMaterial : StandardMaterial = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        standardMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        standardMaterial.diffuseTexture = dynamicTexture;
        plane.material = standardMaterial;
        plane.material.backFaceCulling = false;
        return plane;
    };

    const mesh = BABYLON.Mesh;

    const axisX = mesh.CreateLines("axisX", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], sceneBase);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane("X", "red", size / 10, sceneBase);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    const axisY = mesh.CreateLines("axisY", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
    ], sceneBase);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    const yChar = makeTextPlane("Y", "green", size / 10, sceneBase);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    const axisZ = mesh.CreateLines("axisZ", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
    ], sceneBase);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    const zChar = makeTextPlane("Z", "blue", size / 10, sceneBase);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
}