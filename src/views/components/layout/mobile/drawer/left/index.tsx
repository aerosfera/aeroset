import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import IoC from "../../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../../environment/ioc/ServiceTypes";
import {useTranslation} from "react-i18next";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import React, {useEffect, useState} from "react";
import {CLOSE_DRAWER_EVENT} from "../../../../../../services/eventBus/EventTypes";
import PointCloudMenuItem from "./pointCloudMenuItem";
import {DrawerContainer, DrawerHeader} from "./style";

interface DrawerPanelProps {
    theme: Theme,
    isOpen: boolean
}

const DrawerLeftPanel: React.FC<DrawerPanelProps> = (props) => {
    const {t} = useTranslation();

    const [state, setState] = useState({
        isOpen: false
    });
    const {isOpen} = state;

    useEffect(() => {
            setState({isOpen: props.isOpen})
        }, [props.isOpen]
    )

    const handleDrawerClose = () => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.send(CLOSE_DRAWER_EVENT, {})
    }

    return (
        <Drawer anchor="left"
                open={isOpen}
                onClose={handleDrawerClose}>
            <DrawerContainer>
                <DrawerHeader>
                    <Tooltip title={t('close')}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon onClick={handleDrawerClose}/>
                        </IconButton>
                    </Tooltip>
                </DrawerHeader>
                <Divider/>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    style={{width: '100%'}}
                >
                    <PointCloudMenuItem/>
                </List>
            </DrawerContainer>
        </Drawer>
    )
}

export default withTheme(DrawerLeftPanel)