import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import {useTranslation} from "react-i18next";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import React, {useEffect, useState} from "react";
import {DrawerBottomContainer, DrawerBottomHeader} from "./style";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IoC from "../../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../../environment/ioc/ServiceTypes";
import {OPEN_BOTTOM_DRAWER_EVENT} from "../../../../../../services/eventBus/EventTypes";
import {BottomDrawerContentType} from "./code/BottomDrawerContentType";
import {SnackbarEvent} from "../../../../snackbar/code/SnackbarEvent";

const DrawerBottomPanel: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation();

    const [state, setState] = useState({
        isOpen: true
    });
    const {isOpen} = state;

    useEffect(() => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.subscribe(OPEN_BOTTOM_DRAWER_EVENT, contentChangedHandler)

        return () => {
            eventBus.unsubscribe(OPEN_BOTTOM_DRAWER_EVENT, contentChangedHandler)
        }
    }, [])

    const contentChangedHandler = (events: any[]) => {
        const content = events[0] as { contentType: BottomDrawerContentType}

        switch (content.contentType){
            case BottomDrawerContentType.PointCloud:

                break;
        }

    }

    const handleDrawerClose = () => {
        setState({isOpen: false})
    }

    return (
        <Drawer anchor="bottom"
                open={isOpen}
                onClose={handleDrawerClose}>
            <DrawerBottomContainer>
                <DrawerBottomHeader>
                    <Tooltip title={t('close')}>
                        <IconButton onClick={handleDrawerClose}>
                            <KeyboardArrowDownIcon onClick={handleDrawerClose}/>
                        </IconButton>
                    </Tooltip>
                </DrawerBottomHeader>
                <Divider/>
                <div>

                </div>
            </DrawerBottomContainer>
        </Drawer>
    )
}

export default withTheme(DrawerBottomPanel)