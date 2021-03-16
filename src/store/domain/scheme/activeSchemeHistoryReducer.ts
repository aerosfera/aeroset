// @ts-nocheck
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import SchemeHistoryItem from "../../../data/scheme/history/SchemeHistoryItem";

const schemeHistoryAdapter = createEntityAdapter<SchemeHistoryItem>({
    selectId: (historyItem) => historyItem.id,
    sortComparer: (a, b) => -1
})

const slice = createSlice({
    name: "activeSchemeHistoryReducer",
    initialState: schemesAdapter.getInitialState({
        loading: 'idle'
    }),
    reducers: {
        schemesHistoryAddOne: schemeHistoryAdapter.addOne,
        schemesHistoryAddMany: schemeHistoryAdapter.addMany,
        schemesHistoryUpdate: schemeHistoryAdapter.updateOne,
        schemesHistoryRemove: schemeHistoryAdapter.removeOne,
    }
});

const schemesSelectors = schemeHistoryAdapter.getSelectors();
export const schemeHistoryIdsSelector = schemesSelectors.selectIds;

const {actions, reducer} = slice;
export const {
    schemesHistoryAddOne,
    schemesHistoryAddMany,
    schemesHistoryUpdate,
    schemesHistoryRemove
} = actions;
export default reducer;