import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import SchemeModel from "../../../data/models/SchemeModel";

const schemesAdapter = createEntityAdapter<SchemeModel>({
    selectId: (model) => model.id,
    sortComparer: (a, b) => a.updated < b.updated ? -1 : 1,
})

const slice = createSlice({
    name: "schemesReducer",
    initialState: schemesAdapter.getInitialState({
        loading: 'idle'
    }),
    reducers: {
        schemesAddOne: schemesAdapter.addOne,
        schemesAddMany: schemesAdapter.addMany,
        schemesUpdate: schemesAdapter.updateOne,
        schemesRemove: schemesAdapter.removeOne,
    }
});

const schemesSelectors = schemesAdapter.getSelectors();
export const schemesByIdSelector = schemesSelectors.selectById;

const {actions, reducer} = slice;
export const {
    schemesAddOne,
    schemesAddMany,
    schemesUpdate,
    schemesRemove
} = actions;

export default reducer;