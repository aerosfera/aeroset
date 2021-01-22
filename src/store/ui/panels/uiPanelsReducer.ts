import {combineReducers} from "redux";
import pointCloudPanelReducer from "./pointCloud/pointCloudPanel";
import schemePanelReducer from "./scheme/schemePanel";

const uiPanelReducer = () => {
    return combineReducers({
        pointCloud: pointCloudPanelReducer,
        scheme: schemePanelReducer
    })
}

export default uiPanelReducer