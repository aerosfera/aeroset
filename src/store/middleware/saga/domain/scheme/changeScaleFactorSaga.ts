import {SchemeMode} from "../../../../../views/types/SchemeMode";
import {store} from "../../../../store";
import {schemesByIdSelector} from "../../../../entity/schemes/schemesReducer";
import {call} from "redux-saga/effects";
import {drawSchemeUISaga} from "./drawSchemeUISaga";
import IoC from "../../../../../infrastructure/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {SnackbarEvent} from "../../../../../views/components/snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../../services/eventBus/EventTypes";
import {Vector3D} from "../../../../../data/base/Vector3D";

export function* changeScaleFactorSaga(action: { payload: Vector3D }) {

}