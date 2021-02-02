import {all} from 'redux-saga/effects'
import entitySaga from "./entity/entitySaga";

export default function* rootSaga() {
    yield all([
        entitySaga()
    ]);
}