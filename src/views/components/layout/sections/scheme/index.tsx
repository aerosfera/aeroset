import React, {Fragment} from "react";
import {useAppDispatch} from "../../../../../store/store";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {AppLoadSchemeFile, AppSettingsIcon} from "../../../shared/icons";
import {schemeLoadFile} from "../../../../../store/ui/sections/scheme/schemeSection";
import { showSchemePanel } from "../../../../../store/ui/panels/scheme/schemePanel";

const SchemeSection: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();

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
            <Fragment>
                <Tooltip title={t('scheme_display_settings')}>
                    <label htmlFor="scheme-open-display-settings">
                        <IconButton
                            onClick={() =>
                                dispatch(showSchemePanel())}
                            component="span"
                            size="small"
                            color="primary">
                            <AppSettingsIcon/>
                        </IconButton>
                    </label>
                </Tooltip>
            </Fragment>
        </div>
    );
};

export default withTheme(SchemeSection);
