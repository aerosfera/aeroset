import {all} from 'redux-saga/effects'
import {schemeSaga} from "./scheme/schemeSaga";

export default function* rootSaga() {
    yield all([
        schemeSaga()
    ]);
}