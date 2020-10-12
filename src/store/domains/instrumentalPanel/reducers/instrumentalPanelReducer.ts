import {combineReducers} from 'redux';
import pointCloudSystemSectionReducer
    from "../sections/pointCloudSystemSection/reductors/pointCloudSystemSectionReducer";

export default function instrumentalPanelReducer() {
    return combineReducers({
            pointCloudSystem: pointCloudSystemSectionReducer
        }
    );
};