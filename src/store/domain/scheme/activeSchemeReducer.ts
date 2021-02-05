// @ts-nocheck
import {createSelector, createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState, store} from "../../store";
import produce from "immer";
import Scheme from "../../../data/scheme/Scheme";
import {SchemeMode} from "../../../views/types/SchemeMode";
import {airModelsById} from "../../entity/models/air/airModelsReducer";
import {SchemeUI} from "../../../data/ui/SchemeUI";
import {schemesByIdSelector} from "../../entity/schemes/schemesReducer";
import AirModel from "../../../data/models/air/AirModel";

export interface SchemeState {
    activeSchemeId: string | null
    activeSchemeUI: SchemeUI | null
    activeSchemeMode: SchemeMode
    activeModelId: string | null
    isSchemeLoading: boolean
}

const defaultState: SchemeState = {
    activeSchemeId: null,
    activeSchemeUI: null,
    activeSchemeMode: 0,
    activeModelId: null,
    isSchemeLoading: false
}

const slice = createSlice({
    name: "activeSchemeReducer",
    initialState: defaultState,
    reducers: {
        setActiveModelId: (state: SchemeState, action: PayloadAction<string | null>) =>
            produce(state, (draft) => {
                draft.activeModelId = action.payload;
            }),
        activeSchemeIdChanged: (state: SchemeState, action: PayloadAction<string | null>) =>
            produce(state, (draft) => {
                draft.activeSchemeId = action.payload;
            }),
        activeSchemeUIChanged: (state: SchemeState, action: PayloadAction<SchemeUI | null>) =>
            produce(state, (draft) => {
                draft.activeSchemeUI = action.payload;
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

export const activeSchemeIdChangedSelector: Selector<ApplicationState, Scheme | null> =
    state => state.domain.activeScheme.activeSchemeId;

export const activeSchemeChangedSelector = createSelector([activeSchemeIdChangedSelector],
    (schemeId: string) => {
        const state = store.getState().entity.schemes;
        const scheme = schemesByIdSelector(state, schemeId);
        return scheme;
    });

export const activeSchemeUIChangedSelector: Selector<ApplicationState, SchemeUI | null> =
    state => state.domain.activeScheme.activeSchemeUI;

export const activeSchemeModeChangedSelector: Selector<ApplicationState, SchemeMode> =
    state => state.domain.activeScheme.activeSchemeMode;

const activeModelIdChangedSelector: Selector<ApplicationState, string> =
    state => state.domain.activeScheme.activeModelId;

export const activeModelsChangedSelector = createSelector([activeModelIdChangedSelector],
    (modelId: string) => {
        const state = store.getState().entity.models.air
        const airModel: AirModel = airModelsById(state, modelId);
        return {
            model: airModel
        };
    });

const {actions, reducer} = slice;
export const {
    activeSchemeIdChanged,
    schemeModeChanged,
    isSchemeLoading,
    activeSchemeUIChanged,
    setActiveModelId
} = actions;
export default reducer;