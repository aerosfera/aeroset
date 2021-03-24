import {all} from 'redux-saga/effects'
import domainSaga from "./domain/domainSaga";
import authSaga from "./auth/authSaga";

export default function* rootSaga() {
    yield all([
        domainSaga(),
        authSaga()
    ]);
}