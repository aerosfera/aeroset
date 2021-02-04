import {selectState} from "../../../../../utilities/saga/selectState";
import {disposeSchemeUI} from "../../../../../logic/scheme/disposeSchemeUI";
import {Mesh} from "@babylonjs/core";
import {SchemeUI} from "../../../../../data/ui/SchemeUI";

export function* schemeDisposeSaga(action: { payload: boolean; }) {
    const isSchemeLoading = action.payload;
    if (!isSchemeLoading)
        return;

    const activeSchemeUI: SchemeUI = yield selectState<SchemeUI>(state => state.domain.activeScheme.activeSchemeUI as SchemeUI);
    if (activeSchemeUI)
        disposeSchemeUI(activeSchemeUI);
}