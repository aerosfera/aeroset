import {injectable} from "inversify";
import SceneRootApi from "../../views/components/layout/scene/base/SceneRootApi";

@injectable()
class ApiProvider {
    private _scene : SceneRootApi = new SceneRootApi();

    get scene(): SceneRootApi {
        return this._scene;
    }
}
export default ApiProvider;
