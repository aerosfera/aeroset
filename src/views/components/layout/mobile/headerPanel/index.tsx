import React, {useEffect, useState} from "react";
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {HeaderMobilePanelContainer} from "./style";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import DrawerLeftPanel from "../drawer/left";
import IoC from "../../../../../infrastructure/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {CLOSE_DRAWER_EVENT} from "../../../../../services/eventBus/EventTypes";
import DrawerBottomPanel from "../drawer/bottom";
import {
    AppUserAccountIcon,
    AppMenuIcon,
    AppMoreVertIcon
} from "../../../shared/icons";

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
                <Toolbar style={{background: props.theme.app.colors.main.darkBlue}}>
                    <Tooltip title={t('menu')}>
                        <IconButton size={"medium"}
                                    aria-label="open drawer"
                                    style={{verticalAlign: "middle"}}
                                    onClick={menuButtonClickHandle}>
                            <AppMenuIcon/>
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" style={{display: "block", flexGrow: 1, marginLeft: 16}}>
                        'Scheme name'
                    </Typography>
                    <Tooltip title={t('actions')}>
                        <IconButton size={"small"}
                                    style={{marginLeft: 10}}>
                            <AppMoreVertIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('user_account')}>
                        <IconButton size={"small"}
                                    style={{marginLeft: 10}}>
                            <AppUserAccountIcon/>
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