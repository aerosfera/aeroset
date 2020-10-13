import {SceneState} from "../types/SceneState";
import {createAction, createReducer} from "@reduxjs/toolkit";

const defaultState: SceneState = {};

const sceneReducer = createReducer(defaultState, builder => {
});

export default sceneReducer;