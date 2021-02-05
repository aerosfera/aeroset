import {all} from "redux-saga/effects";
import {schemeSaga} from "./schemeSaga";

export default function* domainSaga() {
    yield all([
        schemeSaga()
    ]);
}