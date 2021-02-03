import Scheme from "../../../../../data/scheme/Scheme";
import {call, put} from 'redux-saga/effects'
import {parseSchemeFileAsync} from "../../../../../logic/scheme/parseSchemeFileAsync";
import {activeSchemeChanged, isSchemeLoading} from "../../../../entity/scheme/activeSchemeReducer";
import {schemeFileLoadError, schemeLoadFile} from "../../../../ui/sections/scheme/schemeSection";

export function* schemeLoadFileSaga(action: { payload: File | null; }) {
    const file = action.payload;

    if (!file)
        return;

    try {
        const scheme: Scheme = yield call(parseSchemeFileAsync, file);
        yield put(activeSchemeChanged(scheme));
    } catch (err) {
        yield put(schemeFileLoadError(err));
    }
}