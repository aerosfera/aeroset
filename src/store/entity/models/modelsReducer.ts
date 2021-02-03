import {combineReducers} from "@reduxjs/toolkit";
import airModelsReducer from "./air/airModelsReducer";

const modelsReducer = () => {
    return combineReducers({
            air: airModelsReducer,
        }
    )
}
export default modelsReducer