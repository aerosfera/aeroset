import {combineReducers} from "@reduxjs/toolkit";
import activeSchemeReducer from "./scheme/activeSchemeReducer";
import modelsReducer from "./models/modelsReducer";

const entityReducer = () => {
    return combineReducers({
            activeScheme: activeSchemeReducer,
            models: modelsReducer(),
        }
    )
}
export default entityReducer