import {PointCloudSystemSectionState} from "../types/pointCloudSystemSectionState";
import update from 'immutability-helper';
import {createAction, createReducer} from "@reduxjs/toolkit";

const defaultState: PointCloudSystemSectionState = {
    order: 1,
    isActive: true,
    pointsCloudFile: null
}

export const pcsLoadFileAction = createAction<File>("POINT_CLOUD_SYSTEM_SECTION/LOAD_FILE");
export const showPcsFiltersPanelAction = createAction("POINT_CLOUD_SYSTEM_SECTION/SHOW_FILTERS_PANEL");
export const closePcsFiltersPanelAction = createAction("POINT_CLOUD_SYSTEM_SECTION/CLOSE_FILTERS_PANEL");

const pointCloudSystemSectionReducer = createReducer(defaultState, builder => {
    builder.addCase(pcsLoadFileAction, (state, action) => {
        return update(state, {
            pointsCloudFile: {$set: action.payload}
        });
    });
    builder.addCase(showPcsFiltersPanelAction, (state, action) => {
        return update(state, {

        })
    });
    builder.addCase(closePcsFiltersPanelAction, (state, action) => {

    });
})

export default pointCloudSystemSectionReducer;