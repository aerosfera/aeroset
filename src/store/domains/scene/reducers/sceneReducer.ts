import {SceneState} from "../types/SceneState";
import {createAction, createReducer} from "@reduxjs/toolkit";

const defaultState: SceneState = {};

export const tempAction = createAction<number>("TEMP");

const sceneReducer = createReducer(defaultState, builder => {
    builder.addCase(tempAction, (state, action) => {
        alert("sceneReducer");
        return state;
    });
});

export default sceneReducer;