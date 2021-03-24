import {combineReducers} from 'redux'
import uiReducer from "./ui/uiReducer";
import entityReducer from "./entity/entityReducer";
import domainReducer from "./domain/domainReducer";
import { firestoreReducer } from 'redux-firestore';
import authReducer from "./auth/authReducer";

export default function rootReducer() {
    return combineReducers({
        ui: uiReducer(),
        entity: entityReducer(),
        auth: authReducer,
        domain: domainReducer(),
        firestore: firestoreReducer,
    });
};