import {injectable} from "inversify";
import SceneRootApi from "../../views/components/layout/scene/base/SceneRootApi";

@injectable()
class ApiProvider {
    private _sceneRootApi : SceneRootApi = new SceneRootApi();

    get sceneRootApi(): SceneRootApi {
        return this._sceneRootApi;
    }
}
export default ApiProvider;
