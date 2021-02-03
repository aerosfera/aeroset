import React, {useEffect} from "react";
import withTheme from "@material-ui/core/styles/withTheme";
import {Theme} from "@material-ui/core";
import {Scene} from "@babylonjs/core/scene";
import {useSelector} from "react-redux";
import {
    isSchemeLoading,
    activeSchemeChangedSelector,
    activeSchemeModeChangedSelector,
    addActiveModelId
} from "../../../../../store/entity/scheme/activeSchemeReducer";
import {ArcRotateCamera} from "@babylonjs/core";
import {useAppDispatch} from "../../../../../store/store";
import {buildSchemeAsync} from "../../../../../logic/scheme/buildSchemeAsync";
import IoC from "../../../../../infrastructure/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {SnackbarEvent} from "../../../snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../../services/eventBus/EventTypes";
import AirModel from "../models/air";
import {airModelsAddOne} from "../../../../../store/entity/models/air/airModelsReducer";
import NodeValuePair from "../../../../../data/models/NodeValuePair";
import Scheme from "../../../../../data/scheme/Scheme";

const AppSchemeCurrent: React.FC<{ theme: Theme, scene: Scene, camera: ArcRotateCamera }> = (props) => {
    const dispatch = useAppDispatch();

    const {scene, camera} = props;
    const currentScheme = useSelector(activeSchemeChangedSelector);
    const schemeMode = useSelector(activeSchemeModeChangedSelector);

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

                //Todo: test/temp
                const modelId = "sdfasfasfasf"
                dispatch(airModelsAddOne({
                    id: modelId,
                    name: "fdsfsf",
                    created: new Date(),
                    updated: new Date(),
                    values: [],
                    scheme: currentScheme
                }));
                dispatch(addActiveModelId(modelId))
            }
        }

        constructScheme();
    }, [currentScheme, schemeMode, scene, camera])

    return (
        <React.Fragment>
            <AirModel scheme={currentScheme}/>
        </React.Fragment>
    )
}

export default withTheme(AppSchemeCurrent);