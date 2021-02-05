import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {store, useAppDispatch} from "../../../../../store/store";
import {useTranslation} from "react-i18next";
import {FormControlStyled, SelectStyled} from "./style";
import {FormHelperText, MenuItem} from "@material-ui/core";
import {withTheme} from "styled-components";
import {SchemeModel} from "../../../../types/SchemeModel";
import {
    activeSchemeModeChangedSelector,
    addActiveModelId
} from "../../../../../store/domain/scheme/activeSchemeReducer";
import {SchemeMode} from "../../../../types/SchemeMode";
import {ColorGradient} from "../../../../types/ColorGradient";
import {
    colorGradientChanged,
    schemeModelsColorGradientSelector
} from "../../../../../store/ui/panels/models/schemeModelsPanel";
import {useSelector} from "react-redux";

const SetupGradient: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    const gradient = useSelector(schemeModelsColorGradientSelector)

    const handleChange = (event: React.ChangeEvent<{ value: ColorGradient }>) => {
        dispatch(colorGradientChanged(event.target.value as ColorGradient));
    };

    return (
        <React.Fragment>
            <FormControlStyled>
                <SelectStyled
                    value={gradient}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}>
                    <MenuItem value={ColorGradient.Default}>{t('default')}</MenuItem>
                    <MenuItem value={ColorGradient.Aeroset}>{t('aeroset')}</MenuItem>
                    <MenuItem value={ColorGradient.Iron}>{t('iron')}</MenuItem>
                </SelectStyled>
                <FormHelperText>{t('gradient')}</FormHelperText>
            </FormControlStyled>

        </React.Fragment>
    )

}

export default withTheme(SetupGradient)