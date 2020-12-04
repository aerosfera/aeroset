import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import update from "immutability-helper";
import {ApplicationState} from "../../store";
import SchemeInfo from "../../../models/scheme/SchemeInfo";
import produce from "immer";

export interface SchemeState {
    currentScheme: SchemeInfo | null
    availableSchemes: SchemeInfo[]
}

const defaultState: SchemeState = {
    currentScheme: null,
    availableSchemes: []
}

const slice = createSlice({
    name: "schemeReducer",
    initialState: defaultState,
    reducers: {
        selectedSchemeChanged(state: SchemeState, action: PayloadAction<SchemeInfo>) {
            return produce(state, (draft) => {
                draft.currentScheme = action.payload
            });
        },
        addScheme(state: SchemeState, action: PayloadAction<SchemeInfo>) {
            return produce(state, (draft) => {
                draft.availableSchemes.push(action.payload);
            });
        },
        removeScheme(state: SchemeState, action: PayloadAction<SchemeInfo>) {
            return produce(state, (draft) => {
                const index = draft.availableSchemes.indexOf((action.payload))
                draft.availableSchemes.splice(index, 1);
            });
        },
        setSchemes(state: SchemeState, action: PayloadAction<SchemeInfo[]>) {
            return produce(state, (draft) => {
                draft.availableSchemes = action.payload;
            });
        }
    }
});


export const schemeChangedSelector: Selector<ApplicationState, SchemeInfo | null> =
    state => state.entities.scheme.currentScheme;

const {actions, reducer} = slice;
export const {selectedSchemeChanged, addScheme, removeScheme, setSchemes} = actions;
export default reducer;