import React from "react";
import {Menu, MenuItem, Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import {useTranslation} from "react-i18next";
import {HeaderPanelContainer} from "./style";
import IconButton from "@material-ui/core/IconButton";
import {AppUserAccountIcon} from "../../shared/icons";
import {setAuthenticationUserInfo} from "../../../../logic/auth/authStateManager";

const HeaderPanel: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuIsOpen = Boolean(anchorEl);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const signOut = () => {
        handleMenuClose();
        setAuthenticationUserInfo(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <HeaderPanelContainer>
            <div>
                <Tooltip title={t('user_account')}>
                    <IconButton size={"small"}
                                color={"primary"}
                                onClick={handleMenu}
                                style={{marginLeft: 10}}>
                        <AppUserAccountIcon/>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={menuIsOpen}
                    onClose={handleMenuClose}>
                    <MenuItem onClick={signOut}>{t('sign_out')}</MenuItem>
                </Menu>
            </div>
        </HeaderPanelContainer>
    );
}

export default withTheme(HeaderPanel);