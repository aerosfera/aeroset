import SolidPoint from "./SolidPoint";
import calculateMinMaxOfArray from "../../../../../utilities/math/calculateMaxMinOfArray";
import constructPointCloud from "./constructPointCloud";
import IoC from "../../../../../environment/ioc/IoC";
import ServiceTypes from "../../../../../environment/ioc/ServiceTypes";
import ApiProvider from "../../../../../services/apiProvider/ApiProvider";
import {Scene} from "babylonjs/scene";

export default function onCloudPointsFileLoaded(parameters: Array<File>) {
    const reader : FileReader = new FileReader()
    reader.onload = async (e: ProgressEvent<FileReader>) => {
        const fileLines: string[] = [];
        const text: string = <string>(reader.result)
        let lines: string[] = text.split('\n');
        lines.forEach((line) => {
            fileLines.push(line.slice(0, -1));
        });

        const points: SolidPoint[] = fileLines.map((line: string) => {
            const points: string[] = line.split(';');
            const x: number = Number.parseFloat(points[0] ? points[0].replace(',', '.') : "0");
            const y: number = Number.parseFloat(points[1] ? points[1].replace(',', '.') : "0");
            const z: number = Number.parseFloat(points[2] ? points[2].replace(',', '.') : "0");
            const p: number = Number(points[3] ? points[3].replace(',', '.') : "0");

            return new SolidPoint(x, y, z, p);
        });

        const parameters = points.map(p => p.parameter);
        const {max, min} = calculateMinMaxOfArray(parameters);
        const parameterMin = min;
        const parameterMax = max;

        const apiProvider: ApiProvider = IoC.get(Symbol.for("ApiProviderService"));
        const scene = apiProvider.sceneRootApi.scene as Scene;

        const pcsMesh = await constructPointCloud(scene, points, parameterMin, parameterMax);
    };

    const file : File = parameters[0];
    const blob : Blob = <Blob>file;
    reader.readAsText(blob);
}