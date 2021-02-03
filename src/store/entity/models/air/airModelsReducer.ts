import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import AirModel from "../../../../data/models/SchemeModel";

const airModelsAdapter = createEntityAdapter<AirModel>({
    selectId: (model) => model.id,
    sortComparer: (a, b) => a.updated < b.updated ? -1 : 1,
})

const slice = createSlice({
    name: "airModelsReducer",
    initialState: airModelsAdapter.getInitialState({
        loading: 'idle'
    }),
    reducers: {
        airModelsAddOne: airModelsAdapter.addOne,
        airModelsAddMany: airModelsAdapter.addMany,
        airModelsUpdate: airModelsAdapter.updateOne,
        airModelsRemove: airModelsAdapter.removeOne,
    }
});

const airModelsSelectors = airModelsAdapter.getSelectors();
export const airModelsById = airModelsSelectors.selectById;

const {actions, reducer} = slice;
export const {
    airModelsAddOne,
    airModelsAddMany,
    airModelsUpdate,
    airModelsRemove
} = actions;

export default reducer;