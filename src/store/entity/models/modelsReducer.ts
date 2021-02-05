import {combineReducers} from "@reduxjs/toolkit";
import airModelsReducer from "./air/airModelsReducer";
import pressureModelsReducer from "./pressure/pressureModelsReducer";

const modelsReducer = () => {
    return combineReducers({
            air: airModelsReducer,
            pressure: pressureModelsReducer,
        }
    )
}
export default modelsReducer