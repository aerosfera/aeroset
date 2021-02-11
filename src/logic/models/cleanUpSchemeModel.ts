import {SchemeUI} from "../../data/ui/SchemeUI";

const cleanUpSchemeModel = (schemeUI: SchemeUI): void => {
    for (const rib of schemeUI.ribs) {
        const mesh = rib.mesh;
        const material = mesh!.material;
        if (material)
            material.dispose();
    }
}

export default cleanUpSchemeModel;