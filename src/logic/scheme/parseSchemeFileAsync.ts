import Scheme from "../../data/scheme/Scheme";
import jsonEscape from "../../utilities/string/jsonEscape";
import {randomIntFromInterval} from "../../utilities/math/randomIntFromInterval";
import NodeValuePair from "../../data/models/NodeValuePair";
import {store} from "../../store/store";
import {pressureModelsAddOne} from "../../store/entity/models/pressure/pressureModelsReducer";
import {nanoid} from "@reduxjs/toolkit";
import PressureModel from "../../data/models/pressure/PressureModel";

export const parseSchemeFileAsync = (file: File): Promise<Scheme> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            const fileText: string = <string>(reader.result)

            const jsonText = jsonEscape(fileText);
            const scheme: Scheme = JSON.parse(jsonText);

            //Todo: temp
            const arr = new Array<NodeValuePair>()
            for (const node of scheme.nodes) {
                const param = randomIntFromInterval(1, 10);
                arr.push({
                    nodeId: node.id,
                    value: param
                })
            }
            const pressureModel: PressureModel = {
                created: new Date(),
                updated: new Date(),
                id: 'prs' + nanoid(),
                name: "AirModel",
                scheme: scheme,
                values: arr,
                parameterMin: 1,
                parameterMax: 10
            }
            store.dispatch(pressureModelsAddOne(pressureModel));

            resolve(scheme);
        };

        reader.onerror = reject;

        const blob: Blob = <Blob>file;
        reader.readAsText(blob);
    })
}