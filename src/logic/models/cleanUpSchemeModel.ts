import {SchemeUI} from "../../data/ui/SchemeUI";

const cleanUpSchemeModel = (schemeUI: SchemeUI): void => {
    for (const rib of schemeUI.ribs) {
        const mesh = rib.mesh;
        const material = mesh.material;

        try {
            if (material)
                material.dispose();
        } catch (ex) {
            console.log("material.dispose() error :" + ex);
        }
    }
}

export default cleanUpSchemeModel;