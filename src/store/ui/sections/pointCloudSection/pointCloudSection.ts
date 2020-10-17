import {createSlice, PayloadAction, createEntityAdapter} from "@reduxjs/toolkit";
import {SectionState} from "../base/SectionState";
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
        },
        showPointCloudFiltersPanel(state: PointCloudSectionState) {
            alert("showPointCloudFiltersPanel")
        },
        closePointCloudFiltersPanel(state: PointCloudSectionState) {
            alert("closePointCloudFiltersPanel")
        }
    }
});

const {actions, reducer} = slice;
export const {pointCloudLoadFile, showPointCloudFiltersPanel, closePointCloudFiltersPanel} = actions;
export default reducer;