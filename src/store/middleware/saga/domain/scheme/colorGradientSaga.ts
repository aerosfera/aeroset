import {ColorGradient} from "../../../../../views/types/ColorGradient";
import IoC from "../../../../../infrastructure/ioc/IoC";
import ColorGradientService from "../../../../../services/colorGradient/GradientService";
import {COLOR_GRADIENT_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";

export function* colorGradientSaga(action: { payload: ColorGradient }) {
    const colorGradient = action.payload;

    const gradientService = IoC.get<ColorGradientService>(COLOR_GRADIENT_SERVICE);
    gradientService.setGradient(ColorGradient[colorGradient]);
}