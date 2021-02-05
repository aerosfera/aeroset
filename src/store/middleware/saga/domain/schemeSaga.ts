import {takeEvery, takeLatest} from "redux-saga/effects";
import {
    activeSchemeIdChanged,
    isSchemeLoading,
    schemeModeChanged,
    setActiveModelId
} from "../../../domain/scheme/activeSchemeReducer";
import {schemeLoadFile} from "../../../ui/sections/scheme/schemeSection";
import {schemeDisposeSaga} from "./scheme/schemeDisposeSaga";
import {schemeLoadFileSaga} from "./scheme/schemeLoadFileSaga";
import {constructSchemeUISaga} from "./scheme/constructSchemeUISaga";
import {changeSchemeUISaga} from "./scheme/changeSchemeUISaga";
import {showSchemeModelSaga} from "./scheme/showSchemeModelSaga";
import {colorGradientChanged} from "../../../ui/panels/models/schemeModelsPanel";
import {colorGradientSaga} from "./scheme/colorGradientSaga";

export function* schemeSaga() {
    // @ts-ignore
    yield takeLatest(isSchemeLoading, schemeDisposeSaga);
    // @ts-ignore
    yield takeLatest(activeSchemeIdChanged, constructSchemeUISaga);
    // @ts-ignore
    yield takeLatest(schemeModeChanged, changeSchemeUISaga);
    yield takeEvery(schemeLoadFile, schemeLoadFileSaga);
    // @ts-ignore
    yield takeLatest(setActiveModelId, showSchemeModelSaga);
    yield takeLatest(colorGradientChanged, colorGradientSaga);
}