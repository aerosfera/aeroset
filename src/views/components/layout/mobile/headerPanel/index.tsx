import React, {useEffect, useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {HeaderMobilePanelContainer} from "./style";
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import DrawerLeftPanel from "../drawer/left";
import IoC from "../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../environment/ioc/ServiceTypes";
import {CLOSE_DRAWER_EVENT} from "../../../../../services/eventBus/EventTypes";
import DrawerBottomPanel from "../drawer/bottom";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const HeaderMobilePanel: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation();

    const [state, setState] = useState({
        drawerIsOpen: false
    })

    useEffect(() => {
            const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
            eventBus.subscribe(CLOSE_DRAWER_EVENT, onCloseDrawerEvent)
            setState({isOpen: props.isOpen})
            return () => {
                eventBus.unsubscribe(CLOSE_DRAWER_EVENT, onCloseDrawerEvent)
            }
        }, [props.isOpen]
    )

    const onCloseDrawerEvent = (_) => {
        setState({drawerIsOpen: false})
    }

    const menuButtonClickHandle = () => {
        setState({drawerIsOpen: true})
    }

    return (
        <HeaderMobilePanelContainer>
            <AppBar position="fixed">
                <Toolbar style={{background: props.theme.app.colors.main.mediumGray}}>
                    <Tooltip title={t('menu')}>
                        <IconButton size={"medium"}
                                    color={"primary"}
                                    aria-label="open drawer"
                                    style={{verticalAlign: "middle"}}
                                    onClick={menuButtonClickHandle}>
                            <MenuIcon style={{color: "white", fontSize: 35}}/>
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" style={{display: "block", flexGrow: 1, marginLeft: 16}}>
                        'Scheme name'
                    </Typography>
                    <Tooltip title={t('actions')}>
                        <IconButton size={"small"}
                                    color={"primary"}
                                    style={{marginLeft: 10}}>
                            <MoreVertIcon style={{color: "white", fontSize: 35}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('user_account')}>
                        <IconButton size={"small"}
                                    color={"primary"}
                                    style={{marginLeft: 10}}>
                            <AccountCircleIcon style={{color: "white", fontSize: 35}}/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <DrawerLeftPanel isOpen={state.drawerIsOpen}/>
            <DrawerBottomPanel/>
        </HeaderMobilePanelContainer>
    );
}

export default withTheme(HeaderMobilePanel);