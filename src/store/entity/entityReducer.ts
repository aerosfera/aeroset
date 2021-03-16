import {combineReducers} from "@reduxjs/toolkit";
import schemesReducer from "./schemes/schemesReducer";

const entityReducer = () => {
    return combineReducers({
            schemes: schemesReducer,
        }
    )
}
export default entityReducer