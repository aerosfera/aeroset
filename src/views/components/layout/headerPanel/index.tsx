import React from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {HeaderPanelContainer} from "./style";

const HeaderPanel: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation();
    return (
        <HeaderPanelContainer>
            <Tooltip title={t('user_account')}>
                <IconButton size={"small"}
                            color={"primary"}
                            style={{marginLeft: 10}}>
                    <AccountCircleIcon style={{color: "white", fontSize: 35}}/>
                </IconButton>
            </Tooltip>
        </HeaderPanelContainer>
    );
}

export default withTheme(HeaderPanel);