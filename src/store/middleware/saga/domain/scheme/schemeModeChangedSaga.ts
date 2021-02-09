import {SchemeMode} from "../../../../../views/types/SchemeMode";
import {put} from "redux-saga/effects";
import {closeSchemeModelsPanel, setActiveModel} from "../../../../ui/panels/models/schemeModelsPanel";
import {setActiveModelId} from "../../../../domain/scheme/activeSchemeReducer";
import {SchemeModelType} from "../../../../../views/types/SchemeModelType";

export function* schemeModeChangedSaga(action: { payload: SchemeMode }) {
    const schemeMode = action.payload;

    switch (schemeMode) {
        case SchemeMode.Topology:
            yield put(closeSchemeModelsPanel());
            yield put(setActiveModelId(null));
            yield put(setActiveModel(SchemeModelType.None));
            break;
        case SchemeMode.RibGeometry:
            break;

    }
}