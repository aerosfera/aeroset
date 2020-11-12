import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import {useTranslation} from "react-i18next";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import React, {useEffect, useState} from "react";
import {DrawerBottomContainer, DrawerBottomHeader, MobilePanelContainer} from "./style";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IoC from "../../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../../environment/ioc/ServiceTypes";
import {OPEN_BOTTOM_DRAWER_EVENT} from "../../../../../../services/eventBus/EventTypes";
import {BottomDrawerContentType} from "./code/BottomDrawerContentType";
import {AppDivider} from "../../../../shared/style";
import {PanelHeader, PanelHeaderText, PanelHeaderTypography} from "../../../panels/shared/style";
import Typography from "@material-ui/core/Typography";
import PointCloudPanelMobile from "../../../panels/pointCloudPanel/mobile";

const DrawerBottomPanel: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation();

    const [state, setState] = useState({
        isOpen: false,
        visiblePanel: BottomDrawerContentType
    });
    const {isOpen, visiblePanel} = state;

    useEffect(() => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.subscribe(OPEN_BOTTOM_DRAWER_EVENT, contentChangedHandler)

        return () => {
            eventBus.unsubscribe(OPEN_BOTTOM_DRAWER_EVENT, contentChangedHandler)
        }
    }, [])

    const contentChangedHandler = (events: any[]) => {
        const content = events[0] as { contentType: BottomDrawerContentType }
        setState({visiblePanel: content.contentType, isOpen: true})
    }

    const handleDrawerClose = () => {
        setState({...state, isOpen: false})
    }

    return (
        <Drawer anchor="bottom"
                open={isOpen}
                onClose={handleDrawerClose}>
            <DrawerBottomContainer>
                <DrawerBottomHeader>
                    <div style={{marginRight: "auto"}}>
                        <Typography variant="h6">
                            <MobilePanelContainer currentType={BottomDrawerContentType.PointCloud}
                                                  stateType={visiblePanel}>
                                {t('point_cloud_filters')}
                            </MobilePanelContainer>
                        </Typography>
                    </div>
                    <Tooltip title={t('close')}>
                        <IconButton onClick={handleDrawerClose}>
                            <KeyboardArrowDownIcon onClick={handleDrawerClose}/>
                        </IconButton>
                    </Tooltip>
                </DrawerBottomHeader>
                <AppDivider/>
                <MobilePanelContainer currentType={BottomDrawerContentType.PointCloud} stateType={visiblePanel}>
                    <PointCloudPanelMobile/>
                </MobilePanelContainer>
            </DrawerBottomContainer>
        </Drawer>
    )
}

export default withTheme(DrawerBottomPanel)