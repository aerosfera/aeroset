import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import {Vector3} from "@babylonjs/core";
import {CameraMode} from "../../../views/types/CameraMode";

export interface SceneState {
    isTargetAxisVisible: boolean
}

const defaultState: SceneState = {
    isTargetAxisVisible: false
}

const slice = createSlice({
    name: "sceneReducer",
    initialState: defaultState,
    reducers: {
        setTargetAxisVisibility: (state: SceneState, action: PayloadAction<boolean>) =>
            produce(state, (draft) => {
                draft.isTargetAxisVisible = action.payload
            }),
    }
});


export const targetAxisVisibilitySelector: Selector<ApplicationState, boolean> =
    state => state.ui.scene.isTargetAxisVisible;

const {actions, reducer} = slice;
export const {setTargetAxisVisibility} = actions;
export default reducer;