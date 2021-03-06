import {Color4, Particle, PointsCloudSystem, Scene, Vector3} from "@babylonjs/core";
import {PointCloudPanelState} from "../../../../../store/ui/panels/pointCloud/pointCloudPanel";
import {filterPointCloudAsync} from "../../../../../workers/filterPointCloud.worker";
import IoC from "../../../../../infrastructure/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {SnackbarEvent} from "../../../snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../../services/eventBus/EventTypes";

export const setUpPointCloud = (file: File, cloudPointFilters: PointCloudPanelState, scene: Scene) => {
    const reader: FileReader = new FileReader()

    reader.onload = async (e: ProgressEvent<FileReader>) => {
        const fileText: string = <string>(reader.result)
        const pointsCloudSystem = new PointsCloudSystem("pcs", 3, scene, {updatable: false});
        const pointCloudData = await filterPointCloudAsync(fileText, cloudPointFilters)

        const constructParticle = async (particle: Particle, i: number, _: any) => {
            const {vector, color} = pointCloudData[i];
            particle.position = new Vector3(vector.x, vector.y, vector.z);
            particle.color = new Color4(color.r, color.g, color.b, 1)
        }

        const pointsLength = pointCloudData.length;
        pointsCloudSystem.addPoints(pointsLength, constructParticle);

        const mesh = await pointsCloudSystem.buildMeshAsync();

        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        const event: SnackbarEvent = {
            message: i18next.t('point_cloud_successfully_uploaded'),
            alertType: "success"
        }
        eventBus.send(SHOW_SNACKBAR_EVENT, event)

        return pointsCloudSystem;
    };

    const blob: Blob = <Blob>file;
    reader.readAsText(blob);
}



