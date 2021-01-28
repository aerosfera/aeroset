import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {SectionState} from "../SectionState";
import produce from "immer";
import {ApplicationState} from "../../../store";

export interface SchemeSectionState extends SectionState {
    schemeFile: File | null;
}

const defaultState: SchemeSectionState = {
    isActive: true,
    schemeFile: null,
}

const slice = createSlice({
        name: "schemeSectionReducer",
        initialState: defaultState,
        reducers: {
            schemeLoadFile: (state: SchemeSectionState, action: PayloadAction<File | null>) =>
                produce(state, (draft) => {
                    draft.schemeFile = action.payload
                })
        }
    })
;

export const schemeLoadFromFileSelector: Selector<ApplicationState, File | null> =
    state => state.ui.sections.scheme.schemeFile;

const {actions, reducer} = slice;
export const {schemeLoadFile} = actions;
export default reducer;