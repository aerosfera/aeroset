import Scheme from "../../data/scheme/Scheme";
import jsonEscape from "../../utilities/string/jsonEscape";
import {randomIntFromInterval} from "../../utilities/math/randomIntFromInterval";
import NodeValuePair from "../../data/scheme/NodeValuePair";
import {store} from "../../store/store";
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

            resolve(scheme);
        };

        reader.onerror = reject;

        const blob: Blob = <Blob>file;
        reader.readAsText(blob);
    })
}