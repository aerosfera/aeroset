import {PointCloudSystemSectionState} from "../types/pointCloudSystemSectionState";
import update from 'immutability-helper';
import {createAction, createReducer} from "@reduxjs/toolkit";

const defaultState: PointCloudSystemSectionState = {
    order: 1,
    isActive: true,
    pointsCloudFile: null
}

export const pcsLoadFileAction = createAction<File>("POINT_CLOUD_SYSTEM_SECTION/LOAD_FILE");

const pointCloudSystemSectionReducer = createReducer(defaultState, builder => {
    builder.addCase(pcsLoadFileAction, (state, action) => {
        console.log("call pointCloudSystemSectionReducer");
        return update(state, {
            pointsCloudFile: {$set: action.payload}
        });
    });
})

export default pointCloudSystemSectionReducer;