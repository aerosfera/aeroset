import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SectionState} from "../SectionState";
import update from "immutability-helper";

export interface PointCloudSectionState extends SectionState {
    pointsCloudFile: File | null;
}

const defaultState: PointCloudSectionState = {
    isActive: true,
    pointsCloudFile: null,
}

const slice = createSlice({
    name: "pointCloudSection",
    initialState: defaultState,
    reducers: {
        pointCloudLoadFile(state: PointCloudSectionState, action: PayloadAction<File>) {
            return update(state, {
                pointsCloudFile: {$set: action.payload}
            });
        }
    }
});

const {actions, reducer} = slice;
export const {pointCloudLoadFile} = actions;
export default reducer;