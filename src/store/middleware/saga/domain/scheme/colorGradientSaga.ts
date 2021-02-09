import {ColorGradient} from "../../../../../views/types/ColorGradient";
import IoC from "../../../../../infrastructure/ioc/IoC";
import ColorGradientService from "../../../../../services/colorGradient/GradientService";
import {COLOR_GRADIENT_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {call} from "redux-saga/effects";
import {showSchemeModelSaga} from "./showSchemeModelSaga";
import {store} from "../../../../store";

export function* colorGradientSaga(action: { payload: ColorGradient }) {
    const colorGradient = action.payload;

    const gradientService = IoC.get<ColorGradientService>(COLOR_GRADIENT_SERVICE);
    gradientService.setGradient(ColorGradient[colorGradient]);

    const activeModelId = store.getState().domain.activeScheme.activeModelId;

    // @ts-ignore
    yield call(showSchemeModelSaga, {payload: activeModelId});
}