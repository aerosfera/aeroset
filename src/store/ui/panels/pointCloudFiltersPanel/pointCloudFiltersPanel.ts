import {createSlice, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../../store";

export interface PointCloudFiltersState {
    filterXFromLimit: number,
    filterXToLimit: number,
    filterYFromLimit: number,
    filterYToLimit: number,
    filterZFromLimit: number,
    filterZToLimit: number,
};

const defaultState: PointCloudFiltersState = {
    filterXFromLimit: -5,
    filterXToLimit: 5,
    filterYFromLimit: -5,
    filterYToLimit: 5,
    filterZFromLimit: -5,
    filterZToLimit: 5
};

const slice = createSlice({
    name: "pointCloudFiltersPanel",
    initialState: defaultState,
    reducers: {
        changeXFromLimit: (state: PointCloudFiltersState, action) =>
            state
    }
});

export const getPointCloudFiltersPanelSelector: Selector<ApplicationState, PointCloudFiltersState> =
    state => state.ui.panels.pointCloudFiltersPanel;

const {actions, reducer} = slice
export const {changeXFromLimit} = actions
const pointCloudFiltersPanel = reducer
export default pointCloudFiltersPanel