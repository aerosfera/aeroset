import {SchemeUI} from "../../../../../data/ui/SchemeUI";
import {selectState} from "../../../../../utilities/saga/selectState";
import {pressureModelsById} from "../../../../entity/models/pressure/pressureModelsReducer";
import {store} from "../../../../store";
import {call} from "redux-saga/effects";
import {drawPressureSchemeModelAsync} from "../../../../../logic/models/drawPressureSchemeModel";
import IoC from "../../../../../infrastructure/ioc/IoC";
import InfrastructureService from "../../../../../services/infrastructure/infrastructureService";
import {COLOR_GRADIENT_SERVICE, INFRASTRUCTURE_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import ColorGradientService from "../../../../../services/colorGradient/GradientService";
import {ColorGradient} from "../../../../../views/types/ColorGradient";
import defineModelTypeById from "../../../../../logic/models/defineModelTypeById";
import { SchemeModelType } from "../../../../../views/types/SchemeModelType";
import {drawAirSchemeModelAsync} from "../../../../../logic/models/drawAirSchemeModelAsync";
import cleanUpSchemeModel from "../../../../../logic/models/cleanUpSchemeModel";

export function* showSchemeModelSaga(action: { payload: string | null }) {
    const activeModelId = action.payload;

    const activeSchemeUI: SchemeUI | null = yield selectState<SchemeUI | null>(state => state.domain.activeScheme.activeSchemeUI);
    if (!activeSchemeUI)
        return;

    const infrastructureService = IoC.get<InfrastructureService>(INFRASTRUCTURE_SERVICE);
    const scene = infrastructureService.scene;

    if (!activeModelId){
        yield call(cleanUpSchemeModel, activeSchemeUI);
        return;
    }

    const pressureModelsState = store.getState().entity.models.pressure;
    const model = pressureModelsById(pressureModelsState, activeModelId);

    if (!model)
        return;

    const gradientService = IoC.get<ColorGradientService>(COLOR_GRADIENT_SERVICE);

    const schemeType = defineModelTypeById(activeModelId);

    switch (schemeType){
        case SchemeModelType.Air:
            yield call(drawAirSchemeModelAsync, model, scene, activeSchemeUI, gradientService);
            break;
        case SchemeModelType.Pressure:
            // @ts-ignore
            yield call(drawPressureSchemeModelAsync, model, scene, activeSchemeUI, gradientService);
            break;
    }
}