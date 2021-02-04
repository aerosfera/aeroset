import {all} from "redux-saga/effects";
import {schemeSaga} from "../domain/scheme/schemeSaga";

export default function* entitySaga() {
    yield all([
        schemeSaga()
    ]);
}