import {createSlice, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../../store";
import produce from "immer";
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
    isActive: false,
    filterXFromLimit: -100,
    filterXToLimit: 100,
    filterYFromLimit: -100,
    filterYToLimit: 100,
    filterZFromLimit: -100,
    filterZToLimit: 100
};

const slice = createSlice({
    name: "pointCloudPanelReducer",
    initialState: defaultState,
    reducers: {
        changeXFromLimit: (state: PointCloudPanelState, action) =>
            produce(state, (draft) => {
                    draft.filterXFromLimit = action.payload
                }
            ),
        changeXToLimit: (state: PointCloudPanelState, action) =>
            produce(state, (draft) => {
                draft.filterXToLimit = action.payload
            }),
        changeYFromLimit: (state: PointCloudPanelState, action) =>
            produce(state, (draft) => {
                draft.filterYFromLimit = action.payload
            }),
        changeYToLimit: (state: PointCloudPanelState, action) =>
            produce(state, (draft) => {
                draft.filterYToLimit = action.payload
            }),
        changeZFromLimit: (state: PointCloudPanelState, action) =>
            produce(state, (draft) => {
                draft.filterZFromLimit = action.payload
            }),
        changeZToLimit: (state: PointCloudPanelState, action) =>
            produce(state, (draft) => {
                draft.filterZToLimit = action.payload
            }),
        showPointCloudPanel: (state: PointCloudPanelState) =>
            produce(state, (draft) => {
                draft.isActive = true
            }),
        closePointCloudPanel: (state: PointCloudPanelState) =>
            produce(state, (draft) => {
                draft.isActive = false
            })
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