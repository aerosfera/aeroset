// @ts-nocheck
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import produce from "immer";
import Scheme from "../../../models/scheme/Scheme";

export interface AvailableSchemeState {
    availableSchemes: Scheme[]
}

const defaultState: AvailableSchemeState = {
    availableSchemes: []
}

const slice = createSlice({
    name: "availableSchemesReducer",
    initialState: defaultState,
    reducers: {
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
            })
    }
});

const {actions, reducer} = slice;
export const {
    currentSchemeChanged,
    addAvailableScheme,
    removeAvailableScheme,
    setAvailableSchemes
} = actions;
export default reducer;