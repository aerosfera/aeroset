import {combineReducers} from "redux";
import uiSectionsReducer from "./sections/uiSectionsReducer";
import uiPanelsReducer from "./panels/uiPanelsReducer";
import cameraReducer from "./camera/cameraReducer";
import sceneReducer from "./scene/sceneReducer";

const uiReducer = () => {
    return combineReducers({
            sections: uiSectionsReducer(),
            panels: uiPanelsReducer(),
            camera: cameraReducer,
            scene: sceneReducer
        }
    )
}

export default uiReducer