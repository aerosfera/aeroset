import ListItem from "@material-ui/core/ListItem";
import {ListItemIcon, Theme} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import React, {Fragment, useState} from "react";
import {useTranslation} from "react-i18next";
import {withTheme} from "styled-components";
import {useAppDispatch} from "../../../../../../../store/store";
import IoC from "../../../../../../../infrastructure/ioc/IoC";
import {EventBusService} from "../../../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../../../infrastructure/ioc/ServiceTypes";
import {CLOSE_DRAWER_EVENT, OPEN_BOTTOM_DRAWER_EVENT} from "../../../../../../../services/eventBus/EventTypes";
import {BottomDrawerContentType} from "../../bottom/code/BottomDrawerContentType";
import {
    AppOpenPointCloudFiltersIcon,
    AppClearPointCloudIcon,
    AppSchemeIcon,
    AppExpandLess,
    AppExpandMoreIcon,
    AppListItemIcon,
    AppPublishIcon,
    AppSettingsIcon
} from "../../../../../shared/icons";
import {themeColor} from "../../../../../theme/themeAccessors";
import {ThemeColors} from "../../../../../theme/ThemeColors";
import {schemeLoadFile} from "../../../../../../../store/ui/sections/scheme/schemeSection";

const SchemeMenuItem: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const [state, setState] = useState({
        subMenuIsOpen: false
    })
    const {subMenuIsOpen} = state

    const handleClick = () => {
        setState({subMenuIsOpen: !subMenuIsOpen});
    };

    const openPanelSchemeSettingsClickHandle = () => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.send(OPEN_BOTTOM_DRAWER_EVENT, {contentType: BottomDrawerContentType.SchemeSettings})
        eventBus.send(CLOSE_DRAWER_EVENT, {})
    };
    const btnColor = themeColor(ThemeColors.mediumGray)(props)
    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <AppSchemeIcon/>
                </ListItemIcon>
                <ListItemText primary={t('scheme')}/>
                {subMenuIsOpen ? <AppExpandLess/> : <AppExpandMoreIcon/>}
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
                                        eventBus.send(CLOSE_DRAWER_EVENT, {})
                                        dispatch(schemeLoadFile(file));
                                        e.target.value = "";
                                    }
                                }}
                                id="icon-button-file"
                                style={{display: 'none'}}/>
                            <label htmlFor="icon-button-file">
                                <ListItemIcon>
                                    <AppPublishIcon style={{
                                        color: btnColor
                                    }}/>
                                </ListItemIcon>
                            </label>
                            <label htmlFor="icon-button-file">
                                <ListItemText primary={t('load_file_with_scheme')}/>
                            </label>
                        </Fragment>
                    </ListItem>
                    <ListItem button style={{paddingLeft: 32}}>
                        <AppListItemIcon
                            onClick={openPanelSchemeSettingsClickHandle}>
                            <AppSettingsIcon style={{
                                color: btnColor
                            }}/>
                        </AppListItemIcon>
                        <ListItemText
                            onClick={openPanelSchemeSettingsClickHandle}
                            primary={t('scheme_settings')}/>
                    </ListItem>
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default withTheme(SchemeMenuItem)
