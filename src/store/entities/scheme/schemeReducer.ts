import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import Scheme from "../../../models/scheme/Scheme";
import {SchemeMode} from "../../../views/types/SchemeMode";

export interface SchemeState {
    currentScheme: Scheme | null
    availableSchemes: Scheme[]
    currentMode: SchemeMode
}

const defaultState: SchemeState = {
    currentScheme: null,
    availableSchemes: [],
    currentMode: SchemeMode.Topology
}

const slice = createSlice({
        name: "schemeReducer",
        initialState: defaultState,
        reducers: {
            selectedSchemeChanged: (state: SchemeState, action: PayloadAction<Scheme>) =>
                produce(state, (draft) => {
                    draft.currentScheme = action.payload
                }),
            schemeModeChanged: (state: SchemeState, action: PayloadAction<SchemeMode>) =>
                produce(state, (draft) => {
                    draft.currentMode = action.payload
                }),
            addScheme: (state: SchemeState, action: PayloadAction<Scheme>) =>
                produce(state, (draft) => {
                    draft.availableSchemes.push(action.payload);
                }),
            removeScheme: (state: SchemeState, action: PayloadAction<Scheme>) =>
                produce(state, (draft) => {
                    const index = draft.availableSchemes.indexOf((action.payload))
                    draft.availableSchemes.splice(index, 1);
                }),
            setSchemes: (state: SchemeState, action: PayloadAction<Scheme[]>) =>
                produce(state, (draft) => {
                    draft.availableSchemes = action.payload;
                })
        }
    })
;


export const schemeChangedSelector: Selector<ApplicationState, Scheme | null> =
    state => state.entities.scheme.currentScheme;

export const schemesChangedSelector: Selector<ApplicationState, Scheme[]> =
    state => state.entities.scheme.availableSchemes;

export const schemeModeSelector: Selector<ApplicationState, SchemeMode> =
    state => state.entities.scheme.currentMode;

const {actions, reducer} = slice;
export const {selectedSchemeChanged, addScheme, removeScheme, setSchemes, schemeModeChanged} = actions;
export default reducer;