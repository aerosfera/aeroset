import {combineReducers} from 'redux'
import sceneReducer from "./domains/scene/reducers/sceneReducer";
import statePanelReducer from "./domains/statePanel/reducers/statePanelReducer";
import instrumentalPanelReducer from "./domains/instrumentalPanel/instrumentalPanelReducer";
import headerPanelReducer from "./domains/headerPanel/headerPanelReducer";

export default function rootReducer() {
    return combineReducers({
        header: headerPanelReducer,
        instrumental: instrumentalPanelReducer,
        scene: sceneReducer,
        statePanel: statePanelReducer
    });
};