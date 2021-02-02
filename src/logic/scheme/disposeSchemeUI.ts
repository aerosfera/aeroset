import {Mesh} from "@babylonjs/core";

export const disposeSchemeUI = (schemeUI: Mesh[]) => {
    if (schemeUI && schemeUI.length > 0) {
        for (const mesh of schemeUI) {
            mesh.dispose();
        }
    }
}