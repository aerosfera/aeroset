import {combineReducers} from "redux";
import {default as pointCloudSectionReducer} from "./pointCloud/pointCloudSection";
import {default as schemeSectionReducer} from "./scheme/schemeSection";

const uiSectionsReducer = () => {
    return combineReducers({
        pointCloud: pointCloudSectionReducer,
        scheme: schemeSectionReducer
    })
}

export default uiSectionsReducer