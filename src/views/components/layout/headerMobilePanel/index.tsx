import React, {useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {HeaderMobilePanelContainer} from "./style";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const HeaderMobilePanel: React.FC<{ theme: Theme }> = (_) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

        </div>
    );

    return (
        <HeaderMobilePanelContainer>
            <div style={{verticalAlign: "middle"}}>
                {['left', 'right', 'top', 'bottom'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
            <Tooltip title={t('user_account')}>
                <IconButton size={"small"}
                            color={"primary"}
                            style={{marginLeft: 10}}>
                    <MenuIcon style={{color: "white", fontSize: 35}}/>
                </IconButton>
            </Tooltip>
        </HeaderMobilePanelContainer>
    );
}

export default withTheme(HeaderMobilePanel);