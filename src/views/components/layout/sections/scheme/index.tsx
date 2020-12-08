import React, {Fragment} from "react";
import {useAppDispatch} from "../../../../../store/store";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ThemeProvider, withTheme} from "styled-components";
import {ButtonGroup, createMuiTheme, Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {AppLoadSchemeFile} from "../../../shared/icons";
import {schemeLoadFile} from "../../../../../store/ui/sections/scheme/schemeSection";
import Button from "@material-ui/core/Button";
import {purple} from "@material-ui/core/colors";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const SchemeSection: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();

    const innerTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#ffffff',
            },
            secondary: {
                main: '#ffffff'
            }
        },
    });

    return (
        <div>
            <Fragment>
                <input
                    color="primary"
                    type="file"
                    onChange={(e) => {
                        e.preventDefault();
                        const file: File = e.target.files?.[0] as File;
                        if (file && file !== undefined) {
                            dispatch(schemeLoadFile(file));
                        }
                        e.preventDefault()
                    }}
                    id="scheme-load-file"
                    style={{display: 'none'}}/>
                <Tooltip title={t('load_file_with_scheme')}>
                    <label htmlFor="scheme-load-file">
                        <IconButton
                            component="span"
                            size="small"
                            color="primary">
                            <AppLoadSchemeFile/>
                        </IconButton>
                    </label>
                </Tooltip>
            </Fragment>
            <ThemeProvider theme={innerTheme}>
                {/*<Typography variant={"subtitle2"}>Режимы</Typography>*/}
                <ButtonGroup size="small" variant="text" color="primary" aria-label="text outlined primary button group">
                    <Button>{t('scheme_mode_topology')}</Button>
                    <Button>{t('scheme_mode_rib_geometry')}</Button>
                    <Button>{t('scheme_mode_full')}</Button>
                </ButtonGroup>
            </ThemeProvider>
        </div>
    );
};

export default withTheme(SchemeSection);
