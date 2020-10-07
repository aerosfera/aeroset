import SolidPoint from "./SolidPoint";
import calculateMinMaxOfArray from "../../../../../utilities/math/calculateMaxMinOfArray";
import constructPointCloud from "./constructPointCloud";
import IoC from "../../../../../environment/ioc/IoC";
import ServiceTypes from "../../../../../environment/ioc/ServiceTypes";
import ApiProvider from "../../../../../services/apiProvider/ApiProvider";
import {Scene} from "babylonjs/scene";

export default function onCloudPointsFileLoaded(file: File) {
    const reader : FileReader = new FileReader()
    reader.onload = async (e: ProgressEvent<FileReader>) => {
        const internalArray: string[] = [];
        const text: string = <string>(e.target!.result)
        let lines: string[] = text.split('\n');
        lines.forEach((line) => {
            let value: string[] = line.split(';');
            internalArray.push(...value);
        });

        const points: SolidPoint[] = internalArray.map((point: string) => {
            const x: number = Number.parseFloat(point[0] ? point[0].replace(',', '.') : "0");
            const y: number = Number.parseFloat(point[1] ? point[1].replace(',', '.') : "0");
            const z: number = Number.parseFloat(point[2] ? point[2].replace(',', '.') : "0");
            const p: number = Number(point[3] ? point[3].replace(',', '.') : "0");

            return new SolidPoint(x, y, z, p);
        });

        const parameters = points.map(p => p.parameter);
        const {max, min} = calculateMinMaxOfArray(parameters);
        const parameterMin = min;
        const parameterMax = max;

        const apiProvider: ApiProvider = IoC.get(ServiceTypes.ApiProviderService);
        const scene = apiProvider.sceneRootApi.scene as Scene;

        await constructPointCloud(scene, points, parameterMin, parameterMax);
    };

    reader.readAsDataURL(file)
}