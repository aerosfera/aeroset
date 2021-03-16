import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import Scheme from "../../../data/scheme/Scheme";

const schemesAdapter = createEntityAdapter<Scheme>({
    selectId: (model) => model.id,
    sortComparer: (a, b) => -1
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