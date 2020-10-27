import * as BABYLON from "babylonjs";
import {Scene} from "babylonjs/scene";
import {Particle} from "babylonjs/Particles/particle";
import SolidPoint from "./SolidPoint";
import {Mesh} from "babylonjs/Meshes/mesh";
import {PointCloudFiltersState} from "../../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {PointsCloudSystem} from "babylonjs/Particles/pointsCloudSystem";
import calculateMinMaxOfArray from "../../../../../utilities/math/calculateMaxMinOfArray";
import ApiProvider from "../../../../../services/apiProvider/ApiProvider";
import IoC from "../../../../../environment/ioc/IoC";

export default async function constructPointCloud(scene: Scene,
                                                  points: SolidPoint[],
                                                  parameterMin: number,
                                                  parameterMax: number,
                                                  cloudPointFilters: PointCloudFiltersState): Promise<PointsCloudSystem> {


    const filteredPoints: SolidPoint[] = filterPointCloud(points,cloudPointFilters);
    const pointsCloudSystem = new BABYLON.PointsCloudSystem("pcs", 3, scene, {updatable: false});

    const diffP = parameterMax - parameterMin;
    let constructParticle = (particle: Particle, i: number, _: any) => {
        let point = filteredPoints[i];
        const pPercent = ((point.parameter - parameterMin) / diffP) * 100;

        let r: number = 0;
        let g: number = 0;
        let b: number = 0;

        if (pPercent <= 0) {
            r = 0;
            g = 0;
            b = 0;
        } else if (pPercent > 0 && pPercent <= 25) {
            r = 255;
            g = 0 - ((0 - 255) / (0 - 25)) * (0 - pPercent);
            b = 0;
        } else if (pPercent > 25 && pPercent <= 50) {
            r = 255 - ((255 - 0) / (25 - 50)) * (25 - pPercent);
            g = 255;
            b = 0;
        } else if (pPercent > 50 && pPercent <= 75) {
            r = 0;
            g = 255;
            b = 0 - ((0 - 255) / (50 - 100)) * (50 - pPercent);
        } else if (pPercent > 75 && pPercent <= 100) {
            r = 0;
            g = 255 - ((255 - 0) / (75 - 100)) * (75 - pPercent);
            b = 255;
        } else if (pPercent > 100) {
            r = 0;
            g = 0;
            b = 0;
        }

        //particle.position = new BABYLON.Vector3((point.x - 76990) / 100, (point.y - 92383) / 100, (point.z - 525) / 10);
        particle.position = new BABYLON.Vector3(point.x, point.y, point.z);
        particle.color = new BABYLON.Color4(r / 255, g / 255, b / 255, 1)
    }

    const pointsCount = filteredPoints.length;
    pointsCloudSystem.addPoints(pointsCount, constructParticle);
    const mesh = await pointsCloudSystem.buildMeshAsync();
    return pointsCloudSystem;
}

export function setUpPointCloud(file: File, cloudPointFilters: PointCloudFiltersState) {
    const reader: FileReader = new FileReader()

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

        const apiProvider: ApiProvider = IoC.get(Symbol.for("API_PROVIDER_SERVICE"));
        const scene = apiProvider.scene.scene as Scene;

        const sceneRootApi = apiProvider.scene;
        if (sceneRootApi.pointsCloudSystem && apiProvider.scene.pointsCloudSystem !== null) {
            sceneRootApi.pointsCloudSystem.dispose()
            sceneRootApi.pointsCloudSystem = null;
        }

        const pointsCloudSystem = await constructPointCloud(scene, points, parameterMin, parameterMax, cloudPointFilters);
        apiProvider.scene.pointsCloudSystem = pointsCloudSystem;
    };

    const blob: Blob = <Blob>file;
    reader.readAsText(blob);
}

function filterPointCloud(points: SolidPoint[], cloudPointFilters: PointCloudFiltersState): SolidPoint[] {
    const filteredPoints = points.filter(point => {
        const {x, y, z} = point

        if ((x >= cloudPointFilters.filterXFromLimit && x <= cloudPointFilters.filterXToLimit)
            &&
            (y >= cloudPointFilters.filterYFromLimit && y <= cloudPointFilters.filterYToLimit)
            &&
            (z >= cloudPointFilters.filterZFromLimit && z <= cloudPointFilters.filterZToLimit)) {
            return true;
        }

        return false;
    });

    return filteredPoints;
}