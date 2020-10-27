import {injectable} from "inversify";
import SceneAspects from "../../views/components/layout/scene/code/SceneAspects";

@injectable()
class ApiProvider {
    private _scene: SceneAspects = new SceneAspects();

    get scene(): SceneAspects {
        return this._scene;
    }
}

export default ApiProvider;
