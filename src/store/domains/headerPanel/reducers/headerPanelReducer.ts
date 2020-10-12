import {HeaderPanelState} from "../types/HeaderPanelState";
import {createReducer} from "@reduxjs/toolkit";

const defaultState: HeaderPanelState = {};

const headerPanelReducer = createReducer(defaultState, builder => {

});

export default headerPanelReducer;