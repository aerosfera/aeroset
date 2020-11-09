import {createSlice, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../../store";
import update from "immutability-helper";

export interface PointCloudFiltersState {
    filterXFromLimit: number,
    filterXToLimit: number,
    filterYFromLimit: number,
    filterYToLimit: number,
    filterZFromLimit: number,
    filterZToLimit: number,
};

const defaultState: PointCloudFiltersState = {
    filterXFromLimit: -100,
    filterXToLimit: 100,
    filterYFromLimit: -100,
    filterYToLimit: 100,
    filterZFromLimit: -100,
    filterZToLimit: 100
};

const slice = createSlice({
    name: "pointCloudFiltersPanel",
    initialState: defaultState,
    reducers: {
        changeXFromLimit: (state: PointCloudFiltersState, action) =>
            update(state, {
                filterXFromLimit: {$set: action.payload}
            }),
        changeXToLimit: (state: PointCloudFiltersState, action) =>
            update(state, {
                filterXToLimit: {$set: action.payload}
            }),
        changeYFromLimit: (state: PointCloudFiltersState, action) =>
            update(state, {
                filterYFromLimit: {$set: action.payload}
            }),
        changeYToLimit: (state: PointCloudFiltersState, action) =>
            update(state, {
                filterYToLimit: {$set: action.payload}
            }),
        changeZFromLimit: (state: PointCloudFiltersState, action) =>
            update(state, {
                filterZFromLimit: {$set: action.payload}
            }),
        changeZToLimit: (state: PointCloudFiltersState, action) =>
            update(state, {
                filterZToLimit: {$set: action.payload}
            })
    }
});

export const getPointCloudFiltersPanelSelector: Selector<ApplicationState, PointCloudFiltersState> =
    state => state.ui.panels.pointCloudFiltersPanel;

const {actions, reducer} = slice
export const {changeXFromLimit, changeXToLimit, changeYFromLimit, changeYToLimit, changeZFromLimit, changeZToLimit} = actions
const pointCloudFiltersPanel = reducer
export default pointCloudFiltersPanel