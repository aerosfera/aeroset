import {Camera, Light, PointLight, Scene, Vector3} from "@babylonjs/core";

export default (scene: Scene, camera: Camera): PointLight => {
    const light = new PointLight("Omni", new Vector3(10, 50, 50), scene);
    //const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    //light.intensity = 0.7

    // scene.shadowsEnabled = false;
    // light.specular.copyFromFloats( 0.05, 0.05, 0.05)
    // light.groundColor.copyFromFloats(0.05, 0.05, 0.05);

    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });

    return light;
}