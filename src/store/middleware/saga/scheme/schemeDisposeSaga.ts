import Scheme from "../../../../models/Scheme";
import {selectState} from "../../../../utilities/saga/selectState";

export function* schemeDisposeSaga(action: { payload: boolean; }) {
    const currentScheme = yield selectState<Scheme | null>(state => state.entities.scheme.currentScheme);

    if (currentScheme && currentScheme.ui) {
        for (const mesh of currentScheme.ui) {
            mesh.dispose();
        }

        currentScheme.ui = null;
    }
}