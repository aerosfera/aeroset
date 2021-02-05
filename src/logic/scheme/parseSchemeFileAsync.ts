import Scheme from "../../data/scheme/Scheme";
import jsonEscape from "../../utilities/string/jsonEscape";
import {SchemeMode} from "../../views/types/SchemeMode";
import {randomIntFromInterval} from "../../utilities/math/randomIntFromInterval";
import AirModel from "../../data/models/air/AirModel";
import NodeValuePair from "../../data/models/NodeValuePair";
import {store} from "../../store/store";
import {airModelsAddOne} from "../../store/entity/models/air/airModelsReducer";
import {nanoid} from "@reduxjs/toolkit";

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
            const airModel: AirModel = {
                created: new Date(),
                updated: new Date(),
                id: nanoid(),
                name: "AirModel",
                scheme: scheme,
                values: arr
            }
            store.dispatch(airModelsAddOne(airModel));

            resolve(scheme);
        };

        reader.onerror = reject;

        const blob: Blob = <Blob>file;
        reader.readAsText(blob);
    })
}