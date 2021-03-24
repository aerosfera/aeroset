import React from "react";
import {Menu, MenuItem, Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import {useTranslation} from "react-i18next";
import {HeaderPanelContainer} from "./style";
import IconButton from "@material-ui/core/IconButton";
import {AppUserAccountIcon} from "../../shared/icons";
import {useAppDispatch} from "../../../../store/store";
import {setAuthUser} from "../../../../store/auth/authReducer";

const HeaderPanel: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuIsOpen = Boolean(anchorEl);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        dispatch(setAuthUser(null));
    };``

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
                    onClose={handleClose}>
                    <MenuItem onClick={handleClose}>{t('sign_out')}</MenuItem>
                </Menu>
            </div>
        </HeaderPanelContainer>
    );
}

export default withTheme(HeaderPanel);