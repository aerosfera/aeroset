import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import {Vector3} from "@babylonjs/core";
import {CameraMode} from "../../../views/types/CameraMode";

export interface CameraState {
    target: Vector3
    mode: CameraMode
}

const defaultState: CameraState = {
    target: new Vector3(),
    mode: CameraMode.Orthographic
}

const slice = createSlice({
    name: "cameraReducer",
    initialState: defaultState,
    reducers: {
        cameraTargetChanged: (state: CameraState, action: PayloadAction<Vector3>) =>
            produce(state, (draft) => {
                draft.target = action.payload
            }),
        cameraModeChanged: (state: CameraState, action: PayloadAction<CameraMode>) =>
            produce(state, (draft) => {
                draft.mode = action.payload
            })
    }
});


export const cameraTargetSelector: Selector<ApplicationState, Vector3> =
    state => state.entities.camera.target;

export const cameraTargetModeSelector: Selector<ApplicationState, CameraMode> =
    state => state.entities.camera.mode;

const {actions, reducer} = slice;
export const {cameraTargetChanged, cameraModeChanged} = actions;
export default reducer;