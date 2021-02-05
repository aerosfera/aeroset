import {SchemeMode} from "../../../../../views/types/SchemeMode";
import {put} from "redux-saga/effects";
import {closeSchemeModelsPanel} from "../../../../ui/panels/models/schemeModelsPanel";
import {setActiveModelId} from "../../../../domain/scheme/activeSchemeReducer";

export function* schemeModeChangedSaga(action: { payload: SchemeMode }) {
    const schemeMode = action.payload;

    switch (schemeMode) {
        case SchemeMode.Topology:
            yield put(closeSchemeModelsPanel());
            yield put(setActiveModelId(null));
            break;
        case SchemeMode.RibGeometry:
            break;

    }
}