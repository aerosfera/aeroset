import {combineReducers} from "@reduxjs/toolkit";
import activeSchemeReducer from "./scheme/activeSchemeReducer";
import availableSchemesReducer from "./scheme/availableSchemesReducer";

const entityReducer = () => {
    return combineReducers({
            activeScheme: activeSchemeReducer,
            availableSchemes: availableSchemesReducer,
        }
    )
}
export default entityReducer