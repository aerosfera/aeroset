import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {SectionState} from "../SectionState";
import produce from "immer";
import {ApplicationState} from "../../../store";

export interface SchemeSectionState extends SectionState {
    schemeFile: File | null;
    schemeFileLoadError: string | null;
}

const defaultState: SchemeSectionState = {
    isActive: true,
    schemeFile: null,
    schemeFileLoadError: null
}

const slice = createSlice({
        name: "schemeSectionReducer",
        initialState: defaultState,
        reducers: {
            schemeLoadFile: (state: SchemeSectionState, action: PayloadAction<File | null>) =>
                produce(state, (draft) => {
                    //ignored
                }),
            schemeFileLoadError: (state: SchemeSectionState, action: PayloadAction<string | null>) =>
                produce(state, (draft) => {
                    draft.schemeFileLoadError = action.payload
                })
        }
    })
;

export const schemeLoadFromFileSelector: Selector<ApplicationState, File | null> =
    state => state.ui.sections.scheme.schemeFile;

const {actions, reducer} = slice;
export const {schemeLoadFile, schemeFileLoadError} = actions;
export default reducer;