import {takeEvery, takeLatest} from "redux-saga/effects";
import {changeCameraModeSaga} from "./engine/changeCameraModeSaga";
import {cameraModeChanged} from '../../../ui/camera/cameraReducer';

export function* engineSaga() {
    // @ts-ignore
    yield takeLatest(cameraModeChanged, changeCameraModeSaga);
}