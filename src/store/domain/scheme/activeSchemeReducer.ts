// @ts-nocheck
import {createSelector, createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState, store} from "../../store";
import produce from "immer";
import Scheme from "../../../data/scheme/Scheme";
import {SchemeMode} from "../../../data/scheme/SchemeMode";
import {airModelsById} from "../../entity/models/air/airModelsReducer";
import {SchemeUI} from "../../../data/ui/SchemeUI";
import {schemesByIdSelector} from "../../entity/schemes/schemesReducer";
import AirModel from "../../../data/models/air/AirModel";
import {Vector3D} from "../../../data/base/Vector3D";

export interface SchemeState {
    activeSchemeId: string | null
    activeSchemeHistoryId: string | null
    activeSchemeUI: SchemeUI | null
    activeSchemeMode: SchemeMode
    activeScaleFactor: Vector3D
    isSchemeLoading: boolean
}

const defaultState: SchemeState = {
    activeSchemeId: null,
    activeSchemeUI: null,
    activeSchemeMode: 0,
    activeScaleFactor: {x: 1, y: 1, z: 1},
    isSchemeLoading: false
}

const slice = createSlice({
    name: "activeSchemeReducer",
    initialState: defaultState,
    reducers: {
        setActiveScaleFactor: (state: SchemeState, action: PayloadAction<Vector3D>) =>
            produce(state, (draft) => {
                draft.activeScaleFactor = action.payload;
            }),
        activeSchemeIdChanged: (state: SchemeState, action: PayloadAction<string | null>) =>
            produce(state, (draft) => {
                draft.activeSchemeId = action.payload;
            }),
        activeSchemeUIChanged: (state: SchemeState, action: PayloadAction<SchemeUI | null>) =>
            produce(state, (draft) => {
                draft.activeSchemeUI = action.payload;
            }),
        activeSchemeUIUpdated: (state: SchemeState, action: PayloadAction<SchemeUI>) =>
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

export const activeSchemeChangedSelector = createSelector([],
    (schemeId: string) => {
        const state = store.getState().entity.schemes;
        const scheme = schemesByIdSelector(state, schemeId);
        return scheme;
    });

export const activeSchemeUIChangedSelector: Selector<ApplicationState, SchemeUI | null> =
    state => state.domain.activeScheme.activeSchemeUI;

export const activeScaleFactorChangedSelector: Selector<ApplicationState, Vector3D> =
    state => state.domain.activeScheme.activeScaleFactor;

export const activeSchemeModeChangedSelector: Selector<ApplicationState, SchemeMode> =
    state => state.domain.activeScheme.activeSchemeMode;

const {actions, reducer} = slice;
export const {
    activeSchemeIdChanged,
    schemeModeChanged,
    isSchemeLoading,
    activeSchemeUIChanged,
    setActiveScaleFactor,
    activeSchemeUIUpdated
} = actions;
export default reducer;