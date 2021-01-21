import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import {Scene} from '@babylonjs/core/scene';
import {useSelector} from "react-redux";
import {schemeFileLoadSelector} from "../../../../store/ui/sections/scheme/schemeSection";
import {parseSchemeFile} from "./code/parseSchemeFile";
import Scheme from "../../../../models/scheme/Scheme";
import {loadSchemeFileToSceneAsync} from "./code/loadSchemeToScene";
import {SchemeMode} from "../../../types/SchemeMode";
import {DelayedInitialization, GuiEngineData} from "../../../types/DelayedInitialization";
import IoC from "../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../environment/ioc/ServiceTypes";
import {SnackbarEvent} from "../../snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../services/eventBus/EventTypes";

const AppScheme = forwardRef((props, ref: Ref<DelayedInitialization>) => {

    useImperativeHandle(ref, () => ({initialize}));
    const data: File | null = useSelector(schemeFileLoadSelector)
    const [state, setState] = useState<{ engineData: GuiEngineData | null }>({engineData: null})
    const {engineData} = state

    const initialize = async (engineData: GuiEngineData) => {
        setState({engineData})
    }

    const loadScheme = async () => {
        const scheme: Scheme = await parseSchemeFile(data as File)
        await loadSchemeFileToSceneAsync(scheme, engineData as GuiEngineData, SchemeMode.Topology)

        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        const event: SnackbarEvent = {
            message: i18next.t('scheme_successfully_uploaded'),
            alertType: "success"
        }
        eventBus.send(SHOW_SNACKBAR_EVENT, event)
    }

    if (data && engineData) {
        loadScheme()
    }

    return (
        <React.Fragment/>
    )
})

export default AppScheme;
