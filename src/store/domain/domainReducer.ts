import {combineReducers} from "@reduxjs/toolkit";
import availableSchemesReducer from "./availableSchemes/availableSchemesReducer";

const domainReducer = () => {
    return combineReducers({
            availableSchemes: availableSchemesReducer,
        }
    )
}
export default domainReducer