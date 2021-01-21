import {createSlice, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../../store";
import update from "immutability-helper";
import {PanelState} from "../PanelState";

export interface PointCloudPanelState extends PanelState {
    filterXFromLimit: number,
    filterXToLimit: number,
    filterYFromLimit: number,
    filterYToLimit: number,
    filterZFromLimit: number,
    filterZToLimit: number,
};

const defaultState: PointCloudPanelState = {
    isActive: true,
    filterXFromLimit: -100,
    filterXToLimit: 100,
    filterYFromLimit: -100,
    filterYToLimit: 100,
    filterZFromLimit: -100,
    filterZToLimit: 100
};

const slice = createSlice({
    name: "pointCloudPanel",
    initialState: defaultState,
    reducers: {
        changeXFromLimit: (state: PointCloudPanelState, action) =>
            update(state, {
                filterXFromLimit: {$set: action.payload}
            }),
        changeXToLimit: (state: PointCloudPanelState, action) =>
            update(state, {
                filterXToLimit: {$set: action.payload}
            }),
        changeYFromLimit: (state: PointCloudPanelState, action) =>
            update(state, {
                filterYFromLimit: {$set: action.payload}
            }),
        changeYToLimit: (state: PointCloudPanelState, action) =>
            update(state, {
                filterYToLimit: {$set: action.payload}
            }),
        changeZFromLimit: (state: PointCloudPanelState, action) =>
            update(state, {
                filterZFromLimit: {$set: action.payload}
            }),
        changeZToLimit: (state: PointCloudPanelState, action) =>
            update(state, {
                filterZToLimit: {$set: action.payload}
            }),
        showPointCloudPanel(state: PointCloudPanelState) {
            return update(state, {
                isActive: {$set: true}
            });
        },
        closePointCloudPanel(state: PointCloudPanelState) {
            return update(state, {
                isActive: {$set: false}
            });
        }
    }
});

export const pointCloudPanelActivitySelector: Selector<ApplicationState, boolean> =
    state => state.ui.panels.pointCloud.isActive;

export const pointCloudPanelSelector: Selector<ApplicationState, PointCloudPanelState> =
    state => state.ui.panels.pointCloud;

const {actions, reducer} = slice
export const {
    changeXFromLimit,
    changeXToLimit,
    changeYFromLimit,
    changeYToLimit,
    changeZFromLimit,
    changeZToLimit,
    showPointCloudPanel,
    closePointCloudPanel
} = actions
const pointCloudPanel = reducer
export default pointCloudPanel