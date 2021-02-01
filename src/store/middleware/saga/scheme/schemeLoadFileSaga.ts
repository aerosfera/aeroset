import Scheme from "../../../../models/Scheme";
import {call, put} from 'redux-saga/effects'
import {parseSchemeFileAsync} from "../../../../logic/scheme/parseSchemeFileAsync";
import {currentSchemeChanged, isSchemeLoading} from "../../../entities/scheme/schemeReducer";
import {schemeFileLoadError, schemeLoadFile} from "../../../ui/sections/scheme/schemeSection";

export function* schemeLoadFileSaga(action: { payload: File | null; }) {
    const file = action.payload;

    if (!file)
        return;

    try {
        yield put(isSchemeLoading(true));
        const scheme: Scheme = yield call(parseSchemeFileAsync, file);
        yield put(currentSchemeChanged(scheme));
    } catch (err) {
        yield put(schemeFileLoadError(err));
    }
}