import {combineReducers} from "redux";
import pointCloudPanelReducer from "./pointCloud/pointCloudPanel";
import schemePanelReducer from "./scheme/schemePanel";
import schemeModelsReducer from "./models/schemeModelsPanel";

const uiPanelReducer = () => {
    return combineReducers({
        pointCloud: pointCloudPanelReducer,
        activeScheme: schemePanelReducer,
        schemeModels: schemeModelsReducer
    })
}

export default uiPanelReducer