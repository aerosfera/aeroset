import {injectable} from "inversify";
import SceneAspects from "../../views/components/layout/scene/code/SceneAspects";

@injectable()
class ApiProvider {
    private _root: SceneAspects = new SceneAspects();

    get root(): SceneAspects {
        return this._root;
    }
}

export default ApiProvider;
