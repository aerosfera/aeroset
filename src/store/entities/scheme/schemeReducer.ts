// @ts-nocheck
import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import Scheme from "../../../models/Scheme";
import {SchemeMode} from "../../../views/types/SchemeMode";

export interface SchemeState {
    currentScheme: Scheme | null
    availableSchemes: Scheme[]
    recentSchemes: Scheme[]
    isSchemeLoading: boolean
}

const defaultState: SchemeState = {
    currentScheme: null,
    availableSchemes: [],
    recentSchemes: [],
    isSchemeLoading: false
}

const slice = createSlice({
    name: "schemeReducer",
    initialState: defaultState,
    reducers: {
        currentSchemeChanged: (state: SchemeState, action: PayloadAction<Scheme | null>) =>
            produce(state, (draft) => {
                draft.currentScheme = action.payload
            }),
        schemeModeChanged: (state: SchemeState, action: PayloadAction<SchemeMode>) => {
            return produce(state, (draft) => {
                if(draft.currentScheme)
                    draft.currentScheme.mode = action.payload
            });
        },
        isSchemeLoading: (state: SchemeState, action: PayloadAction<boolean>) =>
            produce(state, (draft) => {
                draft.isSchemeLoading = action.payload
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

export const schemeModeSelector: Selector<ApplicationState, SchemeMode> =
    state => state.entities.scheme.currentScheme ? state.entities.scheme.currentScheme.mode : 0;

const {actions, reducer} = slice;
export const {
    currentSchemeChanged,
    addAvailableScheme,
    removeAvailableScheme,
    setAvailableSchemes,
    schemeModeChanged,
    addRecentScheme,
    isSchemeLoading
} = actions;
export default reducer;