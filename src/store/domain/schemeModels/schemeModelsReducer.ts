// @ts-nocheck
import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../../store";
import produce from "immer";
import Scheme from "../../../models/scheme/Scheme";
import {SchemeMode} from "../../../views/types/SchemeMode";
import AirCalculationModel from "../../../models/calculation/air/AirCalculationModel";

export interface modelsSchemeState {
    schemeId: string
    air: AirCalculationModel[]
}

const defaultState: modelsSchemeState = {
    schemeId: string,
    air: []
}

const slice = createSlice({
    name: "modelsReducer",
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
    state => state.entity.activeScheme.activeScheme;

export const schemeModeSelector: Selector<ApplicationState, SchemeMode> =
    state => state.entity.activeScheme.activeScheme ? state.entity.activeScheme.activeScheme.mode : 0;

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