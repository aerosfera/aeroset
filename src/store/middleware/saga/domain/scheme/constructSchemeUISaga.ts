import {store} from "../../../../store";
import {schemesByIdSelector} from "../../../../entity/schemes/schemesReducer";
import IoC from "../../../../../infrastructure/ioc/IoC";
import {EVENT_BUS_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {SnackbarEvent} from "../../../../../views/components/snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../../services/eventBus/EventTypes";
import {call} from "redux-saga/effects";

import {drawSchemeUISaga} from "./drawSchemeUISaga";

export function* constructSchemeUISaga(action: { payload: string | null }) {
    const schemeId = action.payload;

    if (!schemeId)
        return;

    const state = store.getState().entity.schemes;
    const scheme = schemesByIdSelector(state, schemeId);
    const schemeMode = store.getState().domain.activeScheme.activeSchemeMode;

    // @ts-ignore
    yield call(drawSchemeUISaga, scheme, schemeMode);

    const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
    const event: SnackbarEvent = {
        message: i18next.t('scheme_successfully_uploaded'),
        alertType: "success"
    }
    eventBus.send(SHOW_SNACKBAR_EVENT, event);
}