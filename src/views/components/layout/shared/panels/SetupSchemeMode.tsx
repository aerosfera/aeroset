import {withTheme} from "styled-components";
import * as React from "react";
import {useAppDispatch} from "../../../../../store/store";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {schemeModeChanged, activeSchemeModeChangedSelector} from "../../../../../store/domain/scheme/activeSchemeReducer";
import {FormHelperText, MenuItem} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {SchemeMode} from "../../../../../data/scheme/SchemeMode";
import { FormControlStyled, SelectStyled } from "./style";

const SetupSchemeMode: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const schemeMode = useSelector(activeSchemeModeChangedSelector)

    const handleChange = (event: React.ChangeEvent<{ value: SchemeMode }>) => {
        dispatch(schemeModeChanged(event.target.value as SchemeMode))
    };

    return (
        <div>
            <FormControlStyled>
                <SelectStyled
                    value={schemeMode}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}>
                    <MenuItem value={SchemeMode.Topology}>{t('scheme_mode_topology')}</MenuItem>
                    <MenuItem value={SchemeMode.RibGeometry}>{t('scheme_mode_rib_geometry')}</MenuItem>
                </SelectStyled>
                <FormHelperText>{t('mode')}</FormHelperText>
            </FormControlStyled>

        </div>
    )

}

export default withTheme(SetupSchemeMode)