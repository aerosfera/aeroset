import {createSlice, PayloadAction, createEntityAdapter, Selector} from "@reduxjs/toolkit";
import {SectionState} from "../base/SectionState";
import update from "immutability-helper";
import {ApplicationState} from "../../../store";

export interface PointCloudSectionState extends SectionState {
    pointsCloudFile: File | null;
}

const defaultState: PointCloudSectionState = {
    isActive: false,
    pointsCloudFile: null,
}

//Todo: remake using Immer
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
            return update(state, {
                isActive: {$set: true}
            });
        },
        closePointCloudFiltersPanel(state: PointCloudSectionState) {
            return update(state, {
                isActive: {$set: false}
            });
        }
    }
});

export const pointCloudFiltersPanelActivitySelector: Selector<ApplicationState, boolean> =
    state => state.ui.sections.pointCloudSection.isActive;

const {actions, reducer} = slice;
export const {pointCloudLoadFile, showPointCloudFiltersPanel, closePointCloudFiltersPanel} = actions;
export default reducer;