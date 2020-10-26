import React, {useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider, withTheme} from "styled-components";
import red from "@material-ui/core/colors/red";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import App from "../../../App";
import {AppTheme} from "../../theme/theme";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const HeaderPanel: React.FC<{ theme: AppTheme }> = (props) => {
    const theme : AppTheme = props.theme;
    const classes = useStyles();
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor: string) => (
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

    function userAccountClick() {
        toggleDrawer('left', true);
    }

    return (
            <div style={{background: theme.colors.main.lightGray, height: 50, display: "flex", justifyContent: "flex-end"}}>
            <div style={{verticalAlign: "middle"}}>
                {['left', 'right', 'top', 'bottom'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
            <Tooltip title="Аккаунт пользователя">
                <IconButton size={"medium"}
                            color={"primary"}
                            onClick={toggleDrawer('left', true)}
                            style={{verticalAlign: "bottom", marginLeft: 10}}>
                    <AccountCircleIcon style={{color: "white", fontSize: 35}}/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default withTheme(HeaderPanel);