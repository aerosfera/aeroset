import {Color4, Particle, PointsCloudSystem, Scene, Vector3} from "@babylonjs/core";
import {PointCloudFiltersState} from "../../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {filterPointCloudAsync} from "../../../../../workers/pointCloud/filterPointCloud.worker";
import {calculateParticleAsync} from "../../../../../workers/pointCloud/calculateParticle.worker";

export const setUpPointCloud = (file: File, cloudPointFilters: PointCloudFiltersState, scene: Scene) => {
    const reader: FileReader = new FileReader()

    reader.onload = async (e: ProgressEvent<FileReader>) => {
        const fileText: string = <string>(reader.result)
        const pointCloudState = await filterPointCloudAsync(fileText, cloudPointFilters)
        const pointsCloudSystem = new PointsCloudSystem("pcs", 3, scene, {updatable: false});

        const parameterMin = pointCloudState.parameterMin;
        const parameterDiff = pointCloudState.parameterDiff;

        let constructParticle = async (particle: Particle, i: number, _: any) => {
            const solidPoints = pointCloudState.filteredPoints;
            const point = solidPoints[i];
            const {vector, color} = await calculateParticleAsync(i, point, parameterMin, parameterDiff)
            particle.position = vector;
            particle.color = color
            console.log(i)
        }

        const points = pointCloudState.filteredPoints;
        pointsCloudSystem.addPoints(points.length, constructParticle);
        const mesh = await pointsCloudSystem.buildMeshAsync();
        return pointsCloudSystem;
    };

    const blob: Blob = <Blob>file;
    reader.readAsText(blob);
}



