import {combineReducers} from "@reduxjs/toolkit";
import availableSchemesReducer from "../entity/schemes/schemesReducer";
import activeSchemeReducer from "./scheme/activeSchemeReducer";

const domainReducer = () => {
    return combineReducers({
            activeScheme: activeSchemeReducer,
        }
    )
}
export default domainReducer;