import {combineReducers} from "@reduxjs/toolkit";
import schemeReducer from "./scheme/schemeReducer";
import cameraReducer from "./camera/cameraReducer";

const entitiesReducer = () => {
    return combineReducers({
            scheme: schemeReducer,
            camera: cameraReducer
        }
    )
}
export default entitiesReducer