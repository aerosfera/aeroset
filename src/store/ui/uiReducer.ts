import {combineReducers} from "redux";
import uiSectionsReducer from "./sections/uiSectionsReducer";
import uiPanelReducer from "./panels/uiPanelsReducer";

export default function uiReducer() {
    return combineReducers({
            sections: uiSectionsReducer(),
            panels: uiPanelReducer()
        }
    )
}