import {combineReducers} from "redux";
import pointCloudFiltersPanel from "./pointCloudFiltersPanel/pointCloudFiltersPanel";

export default function uiPanelReducer() {
    return combineReducers({
        pointCloudFiltersPanel: pointCloudFiltersPanel
    })
}