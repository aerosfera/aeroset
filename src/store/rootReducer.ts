import {combineReducers} from 'redux'
import sceneReducer from "./domains/scene/reducers/sceneReducer";
import statePanelReducer from "./domains/statePanel/reducers/statePanelReducer";
import headerPanelReducer from "./domains/headerPanel/reducers/headerPanelReducer";
import pointCloudSystemSectionReducer
    from "./domains/instrumentalPanel/sections/pointCloudSystemSection/reductors/pointCloudSystemSectionReducer";

export default function rootReducer() {
    return combineReducers({
        headerPanel: headerPanelReducer,
        instrumentalPanel: combineReducers({
                pointCloudSystem: pointCloudSystemSectionReducer
            }),
        scene: sceneReducer,
        statePanel: statePanelReducer
    });
};