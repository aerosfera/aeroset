import React from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {HeaderPanelContainer} from "./style";
import IoC from "../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../environment/ioc/ServiceTypes";
import {SHOW_SNACKBAR} from "../../../../services/eventBus/EventTypes";
import {SnackbarEvent} from "../../snackbar/code/SnackbarEvent";

const HeaderPanel: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation();

    function handleClick() {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.send(SHOW_SNACKBAR, {message: "test", alertType: "success"} as SnackbarEvent)
    }

    return (
        <HeaderPanelContainer>
            <Tooltip title={t('user_account')}>
                <IconButton size={"small"}
                            color={"primary"}
                            onClick={handleClick}
                            style={{marginLeft: 10}}>
                    <AccountCircleIcon style={{color: "white", fontSize: 35}}/>
                </IconButton>
            </Tooltip>
        </HeaderPanelContainer>
    );
}

export default withTheme(HeaderPanel);