import {withTheme} from "styled-components";
import * as React from "react";
import {useAppDispatch} from "../../../../../../store/store";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {schemeModeChanged, schemeModeSelector} from "../../../../../../store/entities/scheme/schemeReducer";
import {createStyles, FormControl, FormHelperText, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {SchemeMode} from "../../../../../types/SchemeMode";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(2),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


const SetupSchemeMode: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const schemeMode = useSelector(schemeModeSelector)
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: SchemeMode }>) => {
        dispatch(schemeModeChanged(event.target.value as SchemeMode))
    };

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <Select
                    value={schemeMode}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{'aria-label': 'Without label'}}>
                    <MenuItem value={SchemeMode.Topology}>{t('scheme_mode_topology')}</MenuItem>
                    <MenuItem value={SchemeMode.RibGeometry}>{t('scheme_mode_rib_geometry')}</MenuItem>
                </Select>
                <FormHelperText>{t('mode')}</FormHelperText>
            </FormControl>

        </React.Fragment>
    )

}

export default withTheme(SetupSchemeMode)