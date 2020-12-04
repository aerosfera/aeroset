import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import {SectionState} from "../base/SectionState";
import update from "immutability-helper";
import {ApplicationState} from "../../../store";

export interface SchemeSectionState extends SectionState {
    schemeFile: File | null;
}

const defaultState: SchemeSectionState = {
    isActive: true,
    schemeFile: null,
}

const slice = createSlice({
    name: "schemeSection",
    initialState: defaultState,
    reducers: {
        schemeLoadFile(state: SchemeSectionState, action: PayloadAction<File>) {
            return update(state, {
                schemeFile: {$set: action.payload}
            });
        }
    }
});

export const schemeFileLoadSelector: Selector<ApplicationState, File | null> =
    state => state.ui.sections.schemeSection.schemeFile;

const {actions, reducer} = slice;
export const {schemeLoadFile} = actions;
export default reducer;