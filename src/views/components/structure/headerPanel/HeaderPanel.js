import React, {useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "styled-components";
import red from "@material-ui/core/colors/red";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";
import TemporarySidePanel from "../../sidePanels/temporarySidePanel";
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

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function HeaderPanel() {
    const classes = useStyles();
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
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#46AD8D",
                contrastText: "white" //button text white instead of black
            },
            background: {
                default: "#394764"
            }
        }
    });

    function userAccountClick() {
        toggleDrawer('left', true);
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div style={{background: "#006494", height: 50, display: "flex", justifyContent: "flex-end"}}>
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
            </ThemeProvider>
        </div>
    );
}

export default HeaderPanel;