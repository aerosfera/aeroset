import {combineReducers} from "@reduxjs/toolkit";
import modelsReducer from "./models/modelsReducer";
import schemesReducer from "./schemes/schemesReducer";

const entityReducer = () => {
    return combineReducers({
            schemes: schemesReducer,
            models: modelsReducer(),
        }
    )
}
export default entityReducer