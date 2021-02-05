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

export function* showSchemeModelSaga(action: { payload: string | null }) {
    const activeModelId = action.payload;
    if (!activeModelId)
        return;

    const activeSchemeUI: SchemeUI | null = yield selectState<SchemeUI | null>(state => state.domain.activeScheme.activeSchemeUI);
    if (!activeSchemeUI)
        return;

    const pressureModelsState = store.getState().entity.models.pressure;
    const model = pressureModelsById(pressureModelsState, activeModelId);

    if (!model)
        return;
    const infrastructureService = IoC.get<InfrastructureService>(INFRASTRUCTURE_SERVICE);
    const scene = infrastructureService.scene;

    const gradientService = IoC.get<ColorGradientService>(COLOR_GRADIENT_SERVICE);
    // @ts-ignore
    yield call(drawPressureSchemeModelAsync, model, scene, activeSchemeUI, gradientService);
}