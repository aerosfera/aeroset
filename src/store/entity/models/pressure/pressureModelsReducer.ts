import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import AirModel from "../../../../data/models/air/AirModel";
import PressureModel from "../../../../data/models/pressure/PressureModel";

const pressureModelsAdapter = createEntityAdapter<PressureModel>({
    selectId: (model) => model.id,
    sortComparer: (a, b) => a.updated < b.updated ? -1 : 1,
})

const slice = createSlice({
    name: "pressureModelsReducer",
    initialState: pressureModelsAdapter.getInitialState({
        loading: 'idle'
    }),
    reducers: {
        pressureModelsAddOne: pressureModelsAdapter.addOne,
        pressureModelsAddMany: pressureModelsAdapter.addMany,
        pressureModelsUpdate: pressureModelsAdapter.updateOne,
        pressureModelsRemove: pressureModelsAdapter.removeOne,
    }
});

const pressureModelsSelectors = pressureModelsAdapter.getSelectors();
export const pressureModelsById = pressureModelsSelectors.selectById;
export const pressureModelsAll = pressureModelsSelectors.selectAll;

const {actions, reducer} = slice;
export const {
    pressureModelsAddOne,
    pressureModelsAddMany,
    pressureModelsUpdate,
    pressureModelsRemove
} = actions;

export default reducer;