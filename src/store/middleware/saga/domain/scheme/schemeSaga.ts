import {takeEvery, takeLatest} from "redux-saga/effects";
import {
    activeSchemeIdChanged,
    addActiveModelId,
    isSchemeLoading,
    schemeModeChanged
} from "../../../../domain/scheme/activeSchemeReducer";
import {schemeLoadFile} from "../../../../ui/sections/scheme/schemeSection";
import {schemeDisposeSaga} from "./schemeDisposeSaga";
import {schemeLoadFileSaga} from "./schemeLoadFileSaga";
import {constructSchemeUISaga} from "./constructSchemeUISaga";
import {changeSchemeUISaga} from "./changeSchemeUISaga";
import {showSchemeModelSaga} from "./showSchemeModelSaga";

export function* schemeSaga() {
    // @ts-ignore
    yield takeLatest(isSchemeLoading, schemeDisposeSaga);
    // @ts-ignore
    yield takeLatest(activeSchemeIdChanged, constructSchemeUISaga);
    // @ts-ignore
    yield takeLatest(schemeModeChanged, changeSchemeUISaga);
    yield takeEvery(schemeLoadFile, schemeLoadFileSaga);
    // @ts-ignore
    yield takeEvery(addActiveModelId, showSchemeModelSaga);
}