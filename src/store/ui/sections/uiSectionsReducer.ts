import {combineReducers} from "redux";
import {default as pointCloudSectionReducer} from "./pointCloud/pointCloudSection";
import {default as schemeSectionReducer} from "./scheme/schemeSection";

export default function uiSectionsReducer() {
    return combineReducers({
        pointCloudSection: pointCloudSectionReducer,
        schemeSection: schemeSectionReducer
    })
}