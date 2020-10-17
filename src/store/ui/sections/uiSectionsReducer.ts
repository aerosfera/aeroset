import {combineReducers} from "redux";
import {default as pointCloudSectionReducer} from "./pointCloudSection/pointCloudSection";

export default function uiSectionsReducer() {
    return combineReducers({
        pointCloudSection: pointCloudSectionReducer
    })
}