import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import {Vector3} from "@babylonjs/core";

export interface CameraState {
    target: Vector3
}

const defaultState: CameraState = {
    target: new Vector3()
}

const slice = createSlice({
    name: "cameraReducer",
    initialState: defaultState,
    reducers: {
        cameraTargetChanged(state: CameraState, action: PayloadAction<Vector3>) {
            return produce(state, (draft) => {
                draft.target = action.payload
            });
        }
    }
});


export const cameraTargetChangedSelector: Selector<ApplicationState, Vector3> =
    state => state.entities.camera.target;

const {actions, reducer} = slice;
export const {cameraTargetChanged} = actions;
export default reducer;