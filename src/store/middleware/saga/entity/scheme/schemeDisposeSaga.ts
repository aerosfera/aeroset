import {selectState} from "../../../../../utilities/saga/selectState";
import {disposeSchemeUI} from "../../../../../logic/scheme/disposeSchemeUI";
import {Mesh} from "@babylonjs/core";

export function* schemeDisposeSaga(action: { payload: boolean; }) {
    const isSchemeLoading = action.payload;

    if (!isSchemeLoading)
        return;

    const activeSchemeUI: Mesh[] = yield selectState<Mesh[]>(state => state.entity.activeScheme.activeSchemeUi as Mesh[]);

    if (activeSchemeUI)
        disposeSchemeUI(activeSchemeUI);
}