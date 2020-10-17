import {combineReducers} from 'redux'
import uiReducer from "./ui/uiReducer";

export default function rootReducer() {
    return combineReducers({
        ui: uiReducer(),
    });
};