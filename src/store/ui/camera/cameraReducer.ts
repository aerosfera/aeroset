import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import {CameraMode} from "../../../views/types/CameraMode";
import {Vector3D} from "../../../data/Vector3D";

export interface CameraState {
    target: Vector3D
    mode: CameraMode
}

const defaultState: CameraState = {
    target: {x: 0, y: 0, z: 0},
    mode: CameraMode.Orthographic
}

const slice = createSlice({
    name: "cameraReducer",
    initialState: defaultState,
    reducers: {
        cameraTargetChanged: (state: CameraState, action: PayloadAction<Vector3D>) =>
            produce(state, (draft) => {
                draft.target = action.payload;
            }),
        cameraModeChanged: (state: CameraState, action: PayloadAction<CameraMode>) =>
            produce(state, (draft) => {
                draft.mode = action.payload;
            })
    }
});


export const cameraTargetSelector: Selector<ApplicationState, Vector3D> =
    state => state.ui.camera.target;

export const cameraTargetModeSelector: Selector<ApplicationState, CameraMode> =
    state => state.ui.camera.mode;

const {actions, reducer} = slice;
export const {cameraTargetChanged, cameraModeChanged} = actions;
export default reducer;