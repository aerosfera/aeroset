import {PointCloudSystemSectionActionTypes, PointCloudSystemSectionState} from "../types/pointCloudSystemSectionState";
import update from 'immutability-helper';

const defaultState: PointCloudSystemSectionState = {
    order: 1,
    isActive: true,
    pointsCloudFile: null
}

export default function pointCloudSystemSectionReducer(state = defaultState, action: PointCloudSystemSectionActionTypes): PointCloudSystemSectionState {
    switch (action.type) {
        case "POINT_CLOUD_SYSTEM_SECTION_LOAD_FILE":
            return update(state, {
                pointsCloudFile : {$set : action.payload}
            })
            state.pointsCloudFile = ;
            break;
        default :
            return state;
    }
}