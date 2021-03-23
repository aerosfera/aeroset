import {all} from "redux-saga/effects";
import {schemeSaga} from "./schemeSaga";
import {engineSaga} from "./engineSaga";

export default function* domainSaga() {
    yield all([
        schemeSaga(),
        engineSaga()
    ]);
}