import {createSlice, Selector} from "@reduxjs/toolkit";
import produce from "immer";
import {ApplicationState} from "../../../store";
import {PanelState} from "../PanelState";

export interface SchemePanelState extends PanelState {
    schemeFile: File | null;
}

const defaultState: SchemePanelState = {
    isActive: false,
    schemeFile: null,
}

const slice = createSlice({
    name: "schemePanelReducer",
    initialState: defaultState,
    reducers: {
        showSchemePanel: (state: SchemePanelState) => {
            produce(state, (draft) => {
                draft.isActive = true
            })
        },
        closeSchemePanel: (state: SchemePanelState) => {
            produce(state, (draft) => {
                draft.isActive = false
            })
        }
    }
});

export const schemePanelActivitySelector: Selector<ApplicationState, boolean> =
    state => state.ui.panels.scheme.isActive;


const {actions, reducer} = slice;
export const {showSchemePanel, closeSchemePanel} = actions;
export default reducer;