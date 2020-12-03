import React from "react";
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import {useTranslation} from "react-i18next";
import {HeaderPanelContainer} from "./style";
import IconButton from "@material-ui/core/IconButton";
import {AppUserAccountIcon} from "../../shared/icons";

const HeaderPanel: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation();
    return (
        <HeaderPanelContainer>
            <Tooltip title={t('user_account')}>
                <IconButton size={"small"}
                            color={"primary"}
                            style={{marginLeft: 10}}>
                    <AppUserAccountIcon/>
                </IconButton>
            </Tooltip>
        </HeaderPanelContainer>
    );
}

export default withTheme(HeaderPanel);