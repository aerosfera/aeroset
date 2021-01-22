import {withTheme} from "styled-components";
import * as React from "react";
import {useAppDispatch} from "../../../../../store/store";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {FormHelperText, MenuItem, Select} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {FormControlStyled, SelectStyled} from "./style";
import {cameraModeChanged, cameraTargetModeSelector} from "../../../../../store/entities/camera/cameraReducer";
import {CameraMode} from "../../../../types/CameraMode";

const SetupCameraMode: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const cameraMode = useSelector(cameraTargetModeSelector)

    const handleChange = (event: React.ChangeEvent<{ value: CameraMode }>) => {
        dispatch(cameraModeChanged(event.target.value as CameraMode))
    };

    return (
        <React.Fragment>
            <FormControlStyled>
                <SelectStyled
                    value={cameraMode}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}>
                    <MenuItem value={CameraMode.Orthographic}>{t('orthographic')}</MenuItem>
                    <MenuItem value={CameraMode.Perspective}>{t('perspective')}</MenuItem>
                </SelectStyled>
                <FormHelperText>{t('camera')}</FormHelperText>
            </FormControlStyled>

        </React.Fragment>
    )

}

export default withTheme(SetupCameraMode)