import {SchemeMode} from "../../../../../data/scheme/SchemeMode";
import {put} from "redux-saga/effects";
import {closeSchemeModelsPanel} from "../../../../ui/panels/models/schemeModelsPanel";

export function* schemeModeChangedSaga(action: { payload: SchemeMode }) {
    const schemeMode = action.payload;

    switch (schemeMode) {
        case SchemeMode.Topology:
            yield put(closeSchemeModelsPanel());
            break;
        case SchemeMode.RibGeometry:
            break;

    }
}