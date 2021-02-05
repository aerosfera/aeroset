import React, {Fragment} from "react";
import {useAppDispatch} from "../../../../../store/store";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {AppLoadSchemeFile, AppModelsIcon, AppSettingsIcon} from "../../../shared/icons";
import {schemeLoadFile} from "../../../../../store/ui/sections/scheme/schemeSection";
import {showSchemePanel} from "../../../../../store/ui/panels/scheme/schemePanel";
import {showSchemeModelsPanel} from "../../../../../store/ui/panels/models/schemeModelsPanel";

const ModelsSection: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();

    const showPanel = () =>
        dispatch(showSchemeModelsPanel());

    return (
        <div>
            <Fragment>
                <Tooltip title={t('scheme_models')}>
                    <label htmlFor="scheme-open-display-settings">
                        <IconButton
                            onClick={showPanel}
                            component="span"
                            size="small"
                            color="primary">
                            <AppModelsIcon/>
                        </IconButton>
                    </label>
                </Tooltip>
            </Fragment>
        </div>
    );
};

export default withTheme(ModelsSection);
