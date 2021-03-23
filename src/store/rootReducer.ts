import {combineReducers} from 'redux'
import uiReducer from "./ui/uiReducer";
import entityReducer from "./entity/entityReducer";
import domainReducer from "./domain/domainReducer";
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

export default function rootReducer() {
    return combineReducers({
        ui: uiReducer(),
        entity: entityReducer(),
        domain: domainReducer(),
        firestore: firestoreReducer
    });
};