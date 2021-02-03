// @ts-nocheck
import {createSelector, createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState, store} from "../../store";
import produce from "immer";
import Scheme from "../../../data/scheme/Scheme";
import {SchemeMode} from "../../../views/types/SchemeMode";
import SchemeUI from "../../../data/scheme/SchemeUI";
import {Mesh} from "@babylonjs/core";
import {airModelsById} from "../models/air/airModelsReducer";

export interface SchemeState {
    activeScheme: Scheme | null
    activeSchemeUi: Mesh[] | null
    activeSchemeMode: SchemeMode
    activeSchemeModelsId: string[]
    isSchemeLoading: boolean
}

const defaultState: SchemeState = {
    activeScheme: null,
    activeSchemeUi: null,
    activeSchemeMode: 0,
    activeSchemeModelsId: [],
    isSchemeLoading: false
}

const slice = createSlice({
    name: "activeSchemeReducer",
    initialState: defaultState,
    reducers: {
        addActiveModelId: (state: SchemeState, action: PayloadAction<string>) =>
            produce(state, (draft) => {
                draft.activeSchemeModelsId.push(action.payload);
            }),
        removeActiveModelId: (state: SchemeState, action: PayloadAction<string>) =>
            produce(state, (draft) => {
                const index = draft.activeSchemeModelsId.indexOf((action.payload))
                draft.activeSchemeModelsId.splice(index, 1);
            }),
        activeSchemeChanged: (state: SchemeState, action: PayloadAction<Scheme | null>) =>
            produce(state, (draft) => {
                draft.activeScheme = action.payload;
            }),
        activeSchemeUIChanged: (state: SchemeState, action: PayloadAction<Mesh[] | null>) =>
            produce(state, (draft) => {
                draft.activeSchemeUi = action.payload;
            }),
        schemeModeChanged: (state: SchemeState, action: PayloadAction<SchemeMode>) => {
            return produce(state, (draft) => {
                draft.activeSchemeMode = action.payload;
            });
        },
        isSchemeLoading: (state: SchemeState, action: PayloadAction<boolean>) =>
            produce(state, (draft) => {
                draft.isSchemeLoading = action.payload;
            })
    }
});

export const activeSchemeChangedSelector: Selector<ApplicationState, SchemeUI | null> =
    state => state.entity.activeScheme.activeScheme;

export const activeSchemeUiChangedSelector: Selector<ApplicationState, SchemeUI | null> =
    state => state.entity.activeScheme.activeSchemeUi;

export const activeSchemeModeChangedSelector: Selector<ApplicationState, SchemeMode> =
    state => state.entity.activeScheme.activeSchemeMode;

const activeModelsIdChangedSelector: Selector<ApplicationState, string[]> =
    state => state.entity.activeScheme.activeSchemeModelsId;

export const activeModelsChangedSelector = createSelector([activeModelsIdChangedSelector],
    (modelsId: string[]) => {
        const state = store.getState().entity.models.air
        const airModels = modelsId.map(m => airModelsById(state, m));
        return airModels;
    });

const {actions, reducer} = slice;
export const {
    activeSchemeChanged,
    schemeModeChanged,
    isSchemeLoading,
    activeSchemeUIChanged,
    addActiveModelId
} = actions;
export default reducer;