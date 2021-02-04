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
    activeSchemeModelsId: string[]
    isSchemeLoading: boolean
}

const defaultState: SchemeState = {
    activeSchemeId: null,
    activeSchemeUI: null,
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

const activeModelsIdChangedSelector: Selector<ApplicationState, string[]> =
    state => state.domain.activeScheme.activeSchemeModelsId;

export const activeModelsChangedSelector = createSelector([activeModelsIdChangedSelector],
    (modelsId: string[]) => {
        const state = store.getState().entity.models.air
        const airModels: AirModel[] = modelsId.map(m => airModelsById(state, m));
        return {
            airModels: airModels
        };
    });

const {actions, reducer} = slice;
export const {
    activeSchemeIdChanged,
    schemeModeChanged,
    isSchemeLoading,
    activeSchemeUIChanged,
    addActiveModelId
} = actions;
export default reducer;