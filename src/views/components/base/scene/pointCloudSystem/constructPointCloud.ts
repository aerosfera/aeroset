import * as BABYLON from "babylonjs";
import {Scene} from "babylonjs/scene";
import {Particle} from "babylonjs/Particles/particle";
import filterPoints from "./filters/filterPoints";
import SolidPoint from "./SolidPoint";
import {Mesh} from "babylonjs/Meshes/mesh";

export default async function constructPointCloud(scene: Scene,
                                                  points: SolidPoint[],
                                                  parameterMin: number,
                                                  parameterMax: number): Promise<Mesh> {


    const filteredPoints: SolidPoint[] = filterPoints(points);

    const pointsCount = filteredPoints.length;
    const pointsCloudSystem = new BABYLON.PointsCloudSystem("pcs", 2, scene, {updatable: false});

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

        particle.position = new BABYLON.Vector3(point.x, point.y, point.z);
        particle.color = new BABYLON.Color4(r / 255, g / 255, b / 255, 1)
    }

    pointsCloudSystem.addPoints(filteredPoints.length, constructParticle);
    const mesh = await pointsCloudSystem.buildMeshAsync();
    return mesh;
}