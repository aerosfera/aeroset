import {takeLatest} from "redux-saga/effects";
import { setAuthUser } from "../../../auth/authReducer";
import {authProcessorSaga} from "./authProcessorSaga";

export default function* authSaga() {
    // @ts-ignore
    yield takeLatest(setAuthUser, authProcessorSaga);
}