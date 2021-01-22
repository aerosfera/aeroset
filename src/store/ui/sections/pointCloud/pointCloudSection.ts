import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SectionState} from "../SectionState";
import produce from "immer";

export interface PointCloudSectionState extends SectionState {
    pointsCloudFile: File | null;
}

const defaultState: PointCloudSectionState = {
    isActive: true,
    pointsCloudFile: null,
}

const slice = createSlice({
    name: "pointCloudSectionReducer",
    initialState: defaultState,
    reducers: {
        pointCloudLoadFile: (state: PointCloudSectionState, action: PayloadAction<File>) =>
            produce(state, (draft) => {
                draft.pointsCloudFile = action.payload
            })
    }
});

const {actions, reducer} = slice;
export const {pointCloudLoadFile} = actions;
export default reducer;