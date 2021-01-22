import {combineReducers} from "@reduxjs/toolkit";
import schemeReducer from "./scheme/schemeReducer";
import cameraReducer from "./camera/cameraReducer";
import sceneReducer from "./scene/sceneReducer";

const entitiesReducer = () => {
    return combineReducers({
            scheme: schemeReducer,
            camera: cameraReducer,
            scene: sceneReducer
        }
    )
}
export default entitiesReducer