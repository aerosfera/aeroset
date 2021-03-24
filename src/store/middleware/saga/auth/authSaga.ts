import {takeLatest} from "redux-saga/effects";
import { setAuthUser } from "../../../auth/authReducer";
import {authProcessorSaga} from "./authProcessorSaga";

export default function* authSaga() {
    yield takeLatest(setAuthUser, authProcessorSaga);
}