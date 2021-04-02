import {takeLatest} from "redux-saga/effects";
import {signInAction} from "../../../auth/authReducer";
import {signInSaga} from "./signInSaga";

export default function* authSaga() {
    // @ts-ignore
    yield takeLatest(signInAction, signInSaga);
}