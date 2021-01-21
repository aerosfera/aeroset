import {combineReducers} from "redux";
import uiSectionsReducer from "./sections/uiSectionsReducer";
import uiPanelsReducer from "./panels/uiPanelsReducer";

const uiReducer = () => {
    return combineReducers({
            sections: uiSectionsReducer(),
            panels: uiPanelsReducer()
        }
    )
}

export default uiReducer