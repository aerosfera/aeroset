import {Scene, Animation, MeshBuilder, StandardMaterial, Texture, Color3, CubeTexture, Mesh} from "@babylonjs/core";
import {SkyMaterial} from "@babylonjs/materials";

const setupEnvironment = (scene: Scene): void => {
    // Sky material
    var skyboxMaterial = new SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    //skyboxMaterial._cachedDefines.FOG = true;

    // Sky mesh (box)
    var skybox = Mesh.CreateBox("skyBox", 50.0, scene);
    skybox.material = skyboxMaterial;

    /*
    * Keys:
    * - 1: Day
    * - 2: Evening
    * - 3: Increase Luminance
    * - 4: Decrease Luminance
    * - 5: Increase Turbidity
    * - 6: Decrease Turbidity
    * - 7: Move horizon to -50
    * - 8: Restore horizon to 0
    */
    var setSkyConfig = function (property: string, from: number, to: number) {
        var keys = [
            {frame: 0, value: from},
            {frame: 100, value: to}
        ];

        var animation = new Animation("animation", property, 100, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        animation.setKeys(keys);

        scene.stopAnimation(skybox);
        scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
    };

    window.addEventListener("keydown", function (evt) {
        switch (evt.keyCode) {
            case 49:
                setSkyConfig("material.inclination", skyboxMaterial.inclination, 0);
                break; // 1
            case 50:
                setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.5);
                break; // 2

            case 51:
                setSkyConfig("material.luminance", skyboxMaterial.luminance, 0.1);
                break; // 3
            case 52:
                setSkyConfig("material.luminance", skyboxMaterial.luminance, 1.0);
                break; // 4

            case 53:
                setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 40);
                break; // 5
            case 54:
                setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 5);
                break; // 6

            case 55:
                setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50);
                break; // 7
            case 56:
                setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 0);
                break;  // 8
            default:
                break;
        }
    });

    // Set to Day
    setSkyConfig("material.inclination", skyboxMaterial.inclination, 0);
}

export default setupEnvironment