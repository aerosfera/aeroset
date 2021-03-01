import {Vector3D} from "../../../../../data/base/Vector3D";
import {scaleScheme} from "../../../../../logic/scheme/scaleScheme";
import {SchemeUI} from "../../../../../data/ui/SchemeUI";
import {selectState} from "../../../../../utilities/saga/selectState";
import {put} from "redux-saga/effects";
import {activeSchemeUIUpdated} from "../../../../domain/scheme/activeSchemeReducer";

export function* changeScaleFactorSaga(action: { payload: Vector3D }) {
    const scaleFactor = action.payload;
    const activeSchemeUI: SchemeUI = yield selectState<SchemeUI>(state => state.domain.activeScheme.activeSchemeUI as SchemeUI);

    if (activeSchemeUI) {
        const centerOfScheme: Vector3D = yield selectState<Vector3D>(state => state.ui.camera.target);
        const updatedSchemeUI = scaleScheme(activeSchemeUI, scaleFactor, centerOfScheme);
        yield put(activeSchemeUIUpdated(updatedSchemeUI));
    }
}