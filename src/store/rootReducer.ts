import {combineReducers} from 'redux'
import sceneReducer from "./domains/scene/reducers/sceneReducer";
import statePanelReducer from "./domains/statePanel/reducers/statePanelReducer";
import instrumentalPanelReducer from "./domains/instrumentalPanel/reducers/instrumentalPanelReducer";
import headerPanelReducer from "./domains/headerPanel/reducers/headerPanelReducer";

export default function rootReducer() {
    return combineReducers({
        headerPanel: headerPanelReducer,
        instrumentalPanel: instrumentalPanelReducer,
        scene: sceneReducer,
        statePanel: statePanelReducer
    });
};

export type ApplicationState = ReturnType<typeof rootReducer>