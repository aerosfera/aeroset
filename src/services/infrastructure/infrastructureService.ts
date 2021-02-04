import {injectable} from "inversify";
import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import {ArcRotateCamera, Light} from "@babylonjs/core";

@injectable()
class InfrastructureService {
    private _engine!: Engine;
    private _scene!: Scene;
    private _camera!: ArcRotateCamera;
    private _light!: Light;

    get light(): Light {
        return this._light;
    }

    set light(value: Light) {
        this._light = value;
    }
    get camera(): ArcRotateCamera {
        return this._camera;
    }

    set camera(value: ArcRotateCamera) {
        this._camera = value;
    }
    get scene(): Scene {
        return this._scene;
    }

    set scene(value: Scene) {
        this._scene = value;
    }
    get engine(): Engine {
        return this._engine;
    }

    set engine(value: Engine) {
        this._engine = value;
    }


    constructor() {

    }
}

export default InfrastructureService;