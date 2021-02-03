import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import produce from "immer";
import Scheme from "../../../data/scheme/Scheme";

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
        addAvailableScheme: (state: AvailableSchemeState, action: PayloadAction<Scheme>) =>
            produce(state, (draft) => {
                draft.availableSchemes.push(action.payload);
            }),
        removeAvailableScheme: (state: AvailableSchemeState, action: PayloadAction<Scheme>) =>
            produce(state, (draft) => {
                const index = draft.availableSchemes.indexOf((action.payload))
                draft.availableSchemes.splice(index, 1);
            }),
        setAvailableSchemes: (state: AvailableSchemeState, action: PayloadAction<Scheme[]>) =>
            produce(state, (draft) => {
                draft.availableSchemes = action.payload;
            })
    }
});

const {actions, reducer} = slice;
export const {
    addAvailableScheme,
    removeAvailableScheme,
    setAvailableSchemes
} = actions;
export default reducer;