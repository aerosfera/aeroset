// @ts-nocheck
import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import Scheme from "../../../models/scheme/Scheme";
import {SchemeMode} from "../../../views/types/SchemeMode";

export interface SchemeState {
    currentScheme: Scheme | null
    availableSchemes: Scheme[]
    recentSchemes: Scheme[]
}

const defaultState: SchemeState = {
    currentScheme: null,
    availableSchemes: [],
    recentSchemes: []
}

const slice = createSlice({
    name: "schemeReducer",
    initialState: defaultState,
    reducers: {
        currentSchemeChanged: (state: SchemeState, action: PayloadAction<Scheme | null>) => {
            produce(state, (draft) => {
                draft.currentScheme = action.payload
            })
        },
        schemeModeChanged: (state: SchemeState, action: PayloadAction<SchemeMode>) =>
            produce(state, (draft) => {
                draft.currentScheme!.mode = action.payload
            }),
        addAvailableScheme: (state: SchemeState, action: PayloadAction<Scheme>) =>
            produce(state, (draft) => {
                draft.availableSchemes.push(action.payload);
            }),
        removeAvailableScheme: (state: SchemeState, action: PayloadAction<Scheme>) =>
            produce(state, (draft) => {
                const index = draft.availableSchemes.indexOf((action.payload))
                draft.availableSchemes.splice(index, 1);
            }),
        setAvailableSchemes: (state: SchemeState, action: PayloadAction<Scheme[]>) =>
            produce(state, (draft) => {
                draft.availableSchemes = action.payload;
            }),
        addRecentScheme: (state: SchemeState, action: PayloadAction<Scheme>) =>
            produce(state, (draft) => {
                draft.recentSchemes.push(action.payload);
            })
    }
});

export const schemeChangedSelector: Selector<ApplicationState, Scheme | null> =
    state => state.entities.scheme.currentScheme;

export const schemesChangedSelector: Selector<ApplicationState, Scheme[]> =
    state => state.entities.scheme.availableSchemes;

export const schemeModeSelector: Selector<ApplicationState, SchemeMode | undefined> =
    state => state.entities.scheme.currentScheme?.mode;

const {actions, reducer} = slice;
export const {
    currentSchemeChanged,
    addAvailableScheme,
    removeAvailableScheme,
    setAvailableSchemes,
    schemeModeChanged,
    addRecentScheme
} = actions;
export default reducer;