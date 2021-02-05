import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import produce from "immer";
import {ApplicationState} from "../../../store";
import {PanelState} from "../PanelState";
import {ColorGradient} from "../../../../views/types/ColorGradient";
import {PointCloudPanelState} from "../pointCloud/pointCloudPanel";
import {SchemeModel} from "../../../../views/types/SchemeModel";

export interface SchemeModelsState extends PanelState {
    gradient: ColorGradient,
    activeModel: SchemeModel
}

const defaultState: SchemeModelsState = {
    isActive: false,
    gradient: ColorGradient.Default,
    activeModel: SchemeModel.None
}

const slice = createSlice({
    name: "schemeModelsReducer",
    initialState: defaultState,
    reducers: {
        showSchemeModelsPanel: (state: SchemeModelsState) =>
            produce(state, (draft) => {
                draft.isActive = true
            }),
        colorGradientChanged: (state: SchemeModelsState, action: PayloadAction<ColorGradient> ) =>
            produce(state, (draft) => {
                draft.gradient = action.payload
            }),
        setActiveModel: (state: SchemeModelsState, action: PayloadAction<SchemeModel>) =>
            produce(state, (draft) => {
                draft.activeModel = action.payload
            }),
        closeSchemeModelsPanel: (state: SchemeModelsState) =>
            produce(state, (draft) => {
                draft.isActive = false
            })

    }
});

export const schemeModelsPanelActivitySelector: Selector<ApplicationState, boolean> =
    state => state.ui.panels.schemeModels.isActive;

export const schemeModelsColorGradientSelector: Selector<ApplicationState, ColorGradient> =
    state => state.ui.panels.schemeModels.gradient;

export const schemeActiveModelSelector: Selector<ApplicationState, SchemeModel> =
    state => state.ui.panels.schemeModels.activeModel;


const {actions, reducer} = slice;
export const {
    showSchemeModelsPanel,
    closeSchemeModelsPanel,
    colorGradientChanged,
    setActiveModel
} = actions;
export default reducer;