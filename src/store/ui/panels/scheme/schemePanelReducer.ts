import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import update from "immutability-helper";
import {ApplicationState} from "../../../store";
import {PanelState} from "../PanelState";

export interface SchemePanelState extends PanelState {
    schemeFile: File | null;
}

const defaultState: SchemePanelState = {
    isActive: true,
    schemeFile: null,
}

const slice = createSlice({
    name: "schemePanel",
    initialState: defaultState,
    reducers: {
        showSchemePanel(state: SchemePanelState) {
            return update(state, {
                isActive: {$set: true}
            });
        },
        closeSchemePanel(state: SchemePanelState) {
            return update(state, {
                isActive: {$set: false}
            });
        }
    }
});

export const schemePanelActivitySelector: Selector<ApplicationState, boolean> =
    state => state.ui.panels.scheme.isActive;


const {actions, reducer} = slice;
export const {showSchemePanel, closeSchemePanel} = actions;
export default reducer;