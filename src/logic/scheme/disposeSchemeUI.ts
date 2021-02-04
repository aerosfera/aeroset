import {SchemeUI} from "../../data/ui/SchemeUI";

export const disposeSchemeUI = (schemeUI: SchemeUI) => {
    if (schemeUI) {
        for (const nodeMesh of schemeUI.nodes) {
            nodeMesh.mesh.dispose();
        }

        for (const nodeRib of schemeUI.ribs) {
            nodeRib.mesh.dispose();
        }

        schemeUI.parent?.dispose();
    }
}