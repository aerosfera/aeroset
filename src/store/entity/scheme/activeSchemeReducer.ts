// @ts-nocheck
import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import Scheme from "../../../models/scheme/Scheme";
import {SchemeMode} from "../../../views/types/SchemeMode";
import SchemeUI from "../../../models/scheme/SchemeUI";

export interface SchemeState {
    activeScheme: Scheme | null
    activeSchemeUi: Mesh[] | null
    activeSchemeMode: SchemeMode
    isSchemeLoading: boolean
}

const defaultState: SchemeState = {
    activeScheme: null,
    activeSchemeUi: null,
    activeSchemeMode: 0,
    isSchemeLoading: false
}

const slice = createSlice({
    name: "activeSchemeReducer",
    initialState: defaultState,
    reducers: {
        activeSchemeChanged: (state: SchemeState, action: PayloadAction<Scheme | null>) =>
            produce(state, (draft) => {
                draft.activeScheme = action.payload
            }),
        activeSchemeUIChanged: (state: SchemeState, action: PayloadAction<Mesh[] | null>) =>
            produce(state, (draft) => {
                draft.activeSchemeUi = action.payload
            }),
        schemeModeChanged: (state: SchemeState, action: PayloadAction<SchemeMode>) => {
            return produce(state, (draft) => {
                draft.activeSchemeMode = action.payload
            });
        },
        isSchemeLoading: (state: SchemeState, action: PayloadAction<boolean>) =>
            produce(state, (draft) => {
                draft.isSchemeLoading = action.payload
            })
    }
});

export const activeSchemeChangedSelector: Selector<ApplicationState, SchemeUI | null> =
    state => state.entity.activeScheme.activeScheme;

export const activeSchemeModeChangedSelector: Selector<ApplicationState, SchemeMode> =
    state => state.entity.activeScheme.activeSchemeMode;

const {actions, reducer} = slice;
export const {
    activeSchemeChanged,
    schemeModeChanged,
    isSchemeLoading,
    activeSchemeUIChanged
} = actions;
export default reducer;