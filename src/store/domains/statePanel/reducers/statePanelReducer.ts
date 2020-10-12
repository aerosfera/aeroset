import {StatePanelState} from "../types/StatePanelState";

const defaultValue : StatePanelState = {

};

export default function statePanelReducer(state = defaultValue, action: any): StatePanelState {
    return state;
};