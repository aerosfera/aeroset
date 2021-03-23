import {SchemeUI} from "../../data/ui/SchemeUI";
import ColorGradientService from "../../services/colorGradient/GradientService";
import {Color3, Mesh} from "@babylonjs/core";
import {GradientMaterial} from "@babylonjs/materials";
import SchemeModel from "../../data/scheme/history/SchemeModel";

export const drawAirSchemeModelAsync = async (model: SchemeModel,
                                              ui: SchemeUI,
                                              ribGradientMaterial: GradientMaterial,
                                              gradientService: ColorGradientService): Promise<void> => {
    ribGradientMaterial.unfreeze();
    try {
        for (const rib of ui.ribs) {
            const ribMesh: Mesh = rib.mesh;
            const node1Id = rib.node1Id;
            const node2Id = rib.node2Id;

            const node1Value = model.values.find(v => v.nodeId === node1Id)!.value;
            const node2Value = model.values.find(v => v.nodeId === node2Id)!.value;

            gradientService.setMinParameter(model.parameterMin);
            gradientService.setMaxParameter(model.parameterMax);

            const node1Color = gradientService.getColor(node1Value);
            const node2Color = gradientService.getColor(node2Value);

            const gradientMaterial = ribGradientMaterial.clone("ribId: " + rib.node1Id + rib.node2Id);

            gradientMaterial.topColor = new Color3(node1Color.Red / 255, node1Color.Green / 255, node1Color.Blue / 255);
            gradientMaterial.bottomColor = new Color3(node2Color.Red / 255, node2Color.Green / 255, node2Color.Blue / 255);

            gradientMaterial.offset = 0.5;
            gradientMaterial.smoothness = 1;

            // @ts-ignore
            ribMesh.material = gradientMaterial;
        }
    } finally {
        ribGradientMaterial.freeze();
    }
}