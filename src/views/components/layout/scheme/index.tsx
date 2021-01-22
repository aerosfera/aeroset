import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import {Scene} from '@babylonjs/core/scene';
import {useSelector} from "react-redux";
import {schemeFileLoadSelector} from "../../../../store/ui/sections/scheme/schemeSection";
import {parseSchemeFile} from "./code/parseSchemeFile";
import Scheme from "../../../../models/scheme/Scheme";
import {loadSchemeFileToSceneAsync} from "./code/loadSchemeToScene";
import {SchemeMode} from "../../../types/SchemeMode";
import {DelayedInitialization, GraphicData} from "../../../types/DelayedInitialization";
import IoC from "../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../environment/ioc/ServiceTypes";
import {SnackbarEvent} from "../../snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../services/eventBus/EventTypes";
import withTheme from "@material-ui/core/styles/withTheme";
import withStyles from "@material-ui/core/styles/withStyles";

const AppScheme = forwardRef((props, ref: Ref<DelayedInitialization>) => {

    useImperativeHandle(ref, () => ({initialize}));
    const data: File | null = useSelector(schemeFileLoadSelector)
    const [state, setState] = useState<{ engineData: GraphicData | null }>({engineData: null})
    const {engineData} = state

    const initialize = async (engineData: GraphicData) => {
        setState({engineData})
    }

    const loadScheme = async () => {
        const scheme: Scheme = await parseSchemeFile(data as File)
        await loadSchemeFileToSceneAsync(scheme, engineData as GraphicData, SchemeMode.Topology)

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

// @ts-ignore
export default withTheme(withStyles(null)(AppScheme));
