import {SchemeMode} from "../../../../../data/scheme/SchemeMode";
import Scheme from "../../../../../data/scheme/Scheme";
import {Scene} from "@babylonjs/core/scene";
import {ArcRotateCamera, Camera, Mesh} from "@babylonjs/core";
import {CameraMode} from "../../../../../views/types/CameraMode";
import {call, put} from "redux-saga/effects";
import {activeSchemeUIChanged, isSchemeLoading} from "../../../../domain/scheme/activeSchemeReducer";
import {SchemeUI} from "../../../../../data/ui/SchemeUI";
import {buildSchemeUIAsync} from "../../../../../logic/scheme/buildSchemeUIAsync";
import {delay} from "../../../../../utilities/async/delay";
import {Vector3D} from "../../../../../data/base/Vector3D";
import {setCameraTargetToCenterOfMeshes} from "../../../../../logic/scheme/construction/setCameraTargetToCenterOfMeshes";
import {cameraTargetChanged} from "../../../../ui/camera/cameraReducer";
import IoC from "../../../../../infrastructure/ioc/IoC";
import InfrastructureService from "../../../../../services/infrastructure/InfrastructureService";
import {INFRASTRUCTURE_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {setupZoomForPerspectiveCamera} from '../../../../../views/components/layout/scene/code/setupZoomForPerspectiveCamera';
import {store} from "../../../../store";

export function* drawSchemeUISaga(scheme: Scheme, cameraMode: CameraMode) {
    const infrastructureService = IoC.get<InfrastructureService>(INFRASTRUCTURE_SERVICE);
    const scene = infrastructureService.scene;
    const camera = infrastructureService.camera;
    let radiusCamera: number;

    const activeScheme = <SchemeUI | null>store.getState().domain.activeScheme.activeSchemeUI;

    if (activeScheme) {
        radiusCamera = camera.radius
    } else {
        radiusCamera = 20;
    }

    yield put(isSchemeLoading(true));
    // @ts-ignore
    const schemeUI: SchemeUI = yield call(buildSchemeUIAsync, scheme, scene, camera, cameraMode);
    yield call(delay, 300); //wait when scheme render

    const cameraTarget: Vector3D = setCameraTargetToCenterOfMeshes(<Mesh>schemeUI.parent, <ArcRotateCamera>camera, <number>radiusCamera);
    if (!activeScheme) {
        setupZoomForPerspectiveCamera(scene, camera, cameraTarget);
    }
    yield put(cameraTargetChanged(cameraTarget));

    yield put(activeSchemeUIChanged(schemeUI));
    yield put(isSchemeLoading(false));
}
