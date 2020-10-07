import * as BABYLON from "babylonjs";
import {Light} from "babylonjs/Lights/light";

export default function setupLight(scene : BABYLON.Scene) : Light {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    return light;
}