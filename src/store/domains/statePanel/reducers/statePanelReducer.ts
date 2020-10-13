import {StatePanelState} from "../types/StatePanelState";
import {createReducer} from "@reduxjs/toolkit";

const defaultValue : StatePanelState = {

};

const statePanelReducer = createReducer(defaultValue, builder => {
});

export default statePanelReducer;