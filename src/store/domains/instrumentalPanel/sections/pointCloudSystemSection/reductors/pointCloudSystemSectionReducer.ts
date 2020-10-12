import {PointCloudSystemSectionState} from "../types/pointCloudSystemSectionState";
import update from 'immutability-helper';
import {createAction, createReducer} from "@reduxjs/toolkit";

const defaultState: PointCloudSystemSectionState = {
    order: 1,
    isActive: true,
    pointsCloudFile: null
}

const pointCloudSystemSectionLoadFile = createAction<File>("POINT_CLOUD_SYSTEM_SECTION/LOAD_FILE");

const pointCloudSystemSectionReducer = createReducer(defaultState, builder => {
    builder.addCase(pointCloudSystemSectionLoadFile,(state, action) => {
        update(state, {
            pointsCloudFile : {$set : action.payload}
        });
    });
})

export default pointCloudSystemSectionReducer;