import {combineReducers} from "redux";
import pointCloudPanelReducer from "./pointCloud/pointCloudPanel";
import schemePanelReducer from "./scheme/schemePanelReducer";

const uiPanelReducer = () => {
    return combineReducers({
        pointCloud: pointCloudPanelReducer,
        scheme: schemePanelReducer
    })
}

export default uiPanelReducer