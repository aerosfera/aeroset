import React, {useEffect} from "react";
import withTheme from "@material-ui/core/styles/withTheme";
import {Theme} from "@material-ui/core";
import {Scene} from "@babylonjs/core/scene";
import {useSelector} from "react-redux";
import {
    isSchemeLoading,
    schemeChangedSelector,
    schemeModeSelector
} from "../../../../../store/entities/scheme/schemeReducer";
import {ArcRotateCamera} from "@babylonjs/core";
import {useAppDispatch} from "../../../../../store/store";
import {buildSchemeAsync} from "../../../../../logic/scheme/buildSchemeAsync";
import IoC from "../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../environment/ioc/ServiceTypes";
import {SnackbarEvent} from "../../../snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../../services/eventBus/EventTypes";

const AppSchemeCurrent: React.FC<{ theme: Theme, scene: Scene, camera: ArcRotateCamera }> = (props) => {
    const dispatch = useAppDispatch();

    const {scene, camera} = props;
    const currentScheme = useSelector(schemeChangedSelector);
    const schemeMode = useSelector(schemeModeSelector);

    useEffect(() => {
        async function constructScheme() {
            if (scene && camera && currentScheme) {
                dispatch(isSchemeLoading(true));

                try {
                    await buildSchemeAsync(currentScheme, scene, camera, schemeMode)
                } finally {
                    dispatch(isSchemeLoading(false));
                }

                const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
                const event: SnackbarEvent = {
                    message: i18next.t('scheme_successfully_uploaded'),
                    alertType: "success"
                }
                eventBus.send(SHOW_SNACKBAR_EVENT, event);
            }
        }

        constructScheme();
    }, [currentScheme, schemeMode, scene, camera])

    return (
        <React.Fragment/>
    )
}

export default withTheme(AppSchemeCurrent);