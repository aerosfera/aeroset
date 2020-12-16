import {HemisphericLight, Light, Scene, Vector3} from "@babylonjs/core";

export default (scene: Scene): Light => {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7

    scene.shadowsEnabled = false;
    light.specular.copyFromFloats( 0.05, 0.05, 0.05)
    light.groundColor.copyFromFloats(0.05, 0.05, 0.05);

    return light;
}