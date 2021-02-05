import {all} from 'redux-saga/effects'
import domainSaga from "./domain/domainSaga";

export default function* rootSaga() {
    yield all([
        domainSaga()
    ]);
}