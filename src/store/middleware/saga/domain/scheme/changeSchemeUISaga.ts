import {store} from "../../../../store";
import {schemesByIdSelector} from "../../../../entity/schemes/schemesReducer";
import IoC from "../../../../../infrastructure/ioc/IoC";
import {EVENT_BUS_SERVICE, INFRASTRUCTURE_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {SnackbarEvent} from "../../../../../views/components/snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../../services/eventBus/EventTypes";
import {call} from "redux-saga/effects";
import {SchemeMode} from "../../../../../views/types/SchemeMode";
import {drawSchemeUISaga} from "./drawSchemeUISaga";

export function* changeSchemeUISaga(action: { payload: SchemeMode }) {
    const schemeMode = action.payload;

    const schemeState = store.getState().entity.schemes;
    const activeSchemeID = <string>store.getState().domain.activeScheme.activeSchemeId;
    const activeScheme = schemesByIdSelector(schemeState, activeSchemeID);

    // @ts-ignore
    yield call(drawSchemeUISaga, activeScheme, schemeMode);

    const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
    const event: SnackbarEvent = {
        message: i18next.t('scheme_mode_changed'),
        alertType: "success"
    }
    eventBus.send(SHOW_SNACKBAR_EVENT, event);
}