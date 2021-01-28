import React from "react";
import {useAppDispatch} from "../../../../../store/store";
import {useSelector} from "react-redux";
import {schemeLoadFromFileSelector, schemeLoadFile} from "../../../../../store/ui/sections/scheme/schemeSection";
import {
    addRecentScheme,
    currentSchemeChanged,
} from "../../../../../store/entities/scheme/schemeReducer";
import {parseSchemeFile} from "../code/parseSchemeFile";
import IoC from "../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../environment/ioc/ServiceTypes";
import {SnackbarEvent} from "../../../snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {SHOW_SNACKBAR_EVENT} from "../../../../../services/eventBus/EventTypes";
import withTheme from "@material-ui/core/styles/withTheme";
import {Theme} from "@material-ui/core";
import {Scene} from "@babylonjs/core/scene";
import {ArcRotateCamera} from "@babylonjs/core";
import {loadSchemeFileToSceneAsync} from "../code/loadSchemeFileToSceneAsync";

const AppSchemeLoadFromFile: React.FC<{ theme: Theme, scene: Scene, camera: ArcRotateCamera }> = (props) => {
    const dispatch = useAppDispatch();
    const {scene, camera} = props;

    const schemeFileLoaded: File | null = useSelector(schemeLoadFromFileSelector);

    const loadScheme = async () => {
        let scheme = null;
        try {
            dispatch(currentSchemeChanged(null));//clear scene

            scheme = await parseSchemeFile(schemeFileLoaded as File)

            await loadSchemeFileToSceneAsync(scheme, scene, camera, scheme.mode)

            const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
            const event: SnackbarEvent = {
                message: i18next.t('scheme_successfully_uploaded'),
                alertType: "success"
            }
            eventBus.send(SHOW_SNACKBAR_EVENT, event);
        } catch (e) {
            scheme = null;
            console.error(e);
        } finally {
            if (scheme) {
                dispatch(addRecentScheme(scheme));
                dispatch(currentSchemeChanged(scheme));
            }

            dispatch(schemeLoadFile(null));
        }
    }

    if (schemeFileLoaded && scene && camera) {
        loadScheme();
    }

    return (
        <React.Fragment/>
    )
};

export default withTheme(AppSchemeLoadFromFile);