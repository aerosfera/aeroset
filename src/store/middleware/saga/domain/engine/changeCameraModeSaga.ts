import {CameraMode} from "../../../../../views/types/CameraMode";
import InfrastructureService from "../../../../../services/infrastructure/InfrastructureService";
import IoC from "../../../../../infrastructure/ioc/IoC";
import {INFRASTRUCTURE_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {Camera} from "@babylonjs/core";

export function* changeCameraModeSaga(action: { payload: CameraMode }) {
    const infrastructureService = IoC.get<InfrastructureService>(INFRASTRUCTURE_SERVICE);
    const camera = infrastructureService.camera;

    if (action.payload === CameraMode.Perspective) {
        camera.mode = Camera.PERSPECTIVE_CAMERA;
        camera.inertia = 0.5;
    } else {
        camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        camera.inertia = 0.3;
    }
}