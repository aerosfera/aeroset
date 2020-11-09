import ListItem from "@material-ui/core/ListItem";
import {ListItemIcon, Theme} from "@material-ui/core";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import React, {Fragment, useState} from "react";
import {useTranslation} from "react-i18next";
import {withTheme} from "styled-components";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DialpadIcon from '@material-ui/icons/Dialpad';
import {
    pointCloudLoadFile
} from "../../../../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import {useAppDispatch} from "../../../../../../../store/store";
import IoC from "../../../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../../../environment/ioc/ServiceTypes";
import {CLOSE_DRAWER_EVENT, OPEN_BOTTOM_DRAWER_EVENT} from "../../../../../../../services/eventBus/EventTypes";
import {BottomDrawerContentType} from "../../bottom/code/BottomDrawerContentType";

const PointCloudMenuItem: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const [state, setState] = useState({
        subMenuIsOpen: false
    })
    const {subMenuIsOpen} = state

    const handleClick = () => {
        setState({subMenuIsOpen: !subMenuIsOpen});
    };

    const openPanelPointCloudFiltersClickHandle = () => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.send(OPEN_BOTTOM_DRAWER_EVENT,{contentType: BottomDrawerContentType.PointCloud})
        eventBus.send(CLOSE_DRAWER_EVENT,{})
    };

    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <BlurOnIcon/>
                </ListItemIcon>
                <ListItemText primary={t('point_cloud')}/>
                {subMenuIsOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={subMenuIsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button style={{paddingLeft: 32}}>
                        <Fragment>
                            <input
                                color="primary"
                                type="file"
                                onChange={(e) => {
                                    e.preventDefault();
                                    const file: File = e.target.files?.[0] as File;
                                    if (file && file !== undefined) {
                                        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
                                        eventBus.send(CLOSE_DRAWER_EVENT,{})
                                        dispatch(pointCloudLoadFile(file));
                                    }
                                }}
                                id="icon-button-file"
                                style={{display: 'none'}}/>
                            <label htmlFor="icon-button-file">
                                <ListItemIcon>
                                    <CloudUploadIcon/>
                                </ListItemIcon>
                            </label>
                            <label htmlFor="icon-button-file">
                                <ListItemText primary={t('load_file_with_point_cloud')}/>
                            </label>
                        </Fragment>

                    </ListItem>
                    <ListItem button style={{paddingLeft: 32}}>
                        <ListItemIcon
                            onClick={openPanelPointCloudFiltersClickHandle}>
                            <DialpadIcon/>
                        </ListItemIcon>
                        <ListItemText
                            onClick={openPanelPointCloudFiltersClickHandle}
                            primary={t('open_panel_point_cloud_filters')}/>
                    </ListItem>
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default withTheme(PointCloudMenuItem)