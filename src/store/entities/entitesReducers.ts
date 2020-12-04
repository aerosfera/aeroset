import {combineReducers} from "@reduxjs/toolkit";
import schemeReducer from "./scheme/schemeReducer";

const entitiesReducer = () => {
    return combineReducers({
            scheme: schemeReducer
        }
    )
}
export default entitiesReducer