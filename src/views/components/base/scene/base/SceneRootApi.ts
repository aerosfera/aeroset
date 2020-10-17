import {Engine} from "babylonjs/Engines/engine";
import {ArcRotateCamera} from "babylonjs/Cameras/arcRotateCamera";
import {Light} from "babylonjs/Lights/light";
import {Scene} from "babylonjs/scene";
import {PointsCloudSystem} from "babylonjs/Particles/pointsCloudSystem";

export default class SceneRootApi {
    private _engine: Engine | null = null;
    private _scene: Scene | null = null;
    private _camera: ArcRotateCamera | null = null;
    private _light: Light | null = null
    private _pointsCloudSystem: PointsCloudSystem | null = null

    get pointsCloudSystem(): PointsCloudSystem | null {
        return this._pointsCloudSystem;
    }
    set pointsCloudSystem(value: PointsCloudSystem | null) {
        this._pointsCloudSystem = value;
    }
    get light(): Light | null {
        return this._light;
    }

    set light(value: Light | null) {
        this._light = value;
    }

    get camera(): ArcRotateCamera | null {
        return this._camera;
    }

    set camera(value: ArcRotateCamera | null) {
        this._camera = value;
    }

    get scene(): Scene | null {
        return this._scene;
    }

    set scene(value: Scene | null) {
        this._scene = value;
    }

    set engine(value: Engine | null) {
        this._engine = value;
    }

    get engine(): Engine | null {
        return this._engine;
    }
}