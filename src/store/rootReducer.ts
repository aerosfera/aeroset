import {combineReducers} from 'redux'
import uiReducer from "./ui/uiReducer";
import entitiesReducer from "./entities/entitesReducers";

export default function rootReducer() {
    return combineReducers({
        ui: uiReducer(),
        entities: entitiesReducer()
    });
};