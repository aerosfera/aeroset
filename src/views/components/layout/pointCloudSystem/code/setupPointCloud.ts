import {Color4, Particle, PointsCloudSystem, Scene, Vector3} from "@babylonjs/core";
import {PointCloudFiltersState} from "../../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {filterPointCloudAsync} from "../../../../../workers/pointCloud/filterPointCloud.worker";
import {CLOSE_BACKDROP_EVENT, SHOW_BACKDROP_EVENT} from "../../../../../services/eventBus/EventTypes";
import i18next from "i18next";
import {sendMessage} from "../../../../../utilities/common/sendMessage";
import { delay } from "../../../../../utilities/async/delay";

export const setUpPointCloud = (file: File, cloudPointFilters: PointCloudFiltersState, scene: Scene) => {
    const reader: FileReader = new FileReader()

    reader.onload = async (e: ProgressEvent<FileReader>) => {
        const fileText: string = <string>(reader.result)
        const pointsCloudSystem = new PointsCloudSystem("pcs", 3, scene, {updatable: false});
        const pointCloudState = await filterPointCloudAsync(fileText, cloudPointFilters)

        let constructParticle = async (particle: Particle, i: number, _: any) => {
            const {vector, color} = pointCloudState[i];
            particle.position = new Vector3(vector.x, vector.y, vector.z);
            particle.color = new Color4(color.r, color.g, color.b)
        }

        const pointsLength = pointCloudState.length;
        pointsCloudSystem.addPoints(pointsLength, constructParticle);

        const mesh = await pointsCloudSystem.buildMeshAsync();
        return pointsCloudSystem;
    };

    const blob: Blob = <Blob>file;
    reader.readAsText(blob);
}



