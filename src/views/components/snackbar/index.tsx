import {Theme} from "@material-ui/core";
import * as React from "react";
import {useEffect, useState} from "react";
import {withTheme} from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";
import IoC from "../../../infrastructure/ioc/IoC";
import {EventBusService} from "../../../services/eventBus/EventBusService";
import {SHOW_NEW_VERSION_EVENT, SHOW_SNACKBAR_EVENT} from "../../../services/eventBus/EventTypes";
import {Alert} from "@material-ui/lab";
import {EVENT_BUS_SERVICE} from "../../../infrastructure/ioc/ServiceTypes";
import {SnackbarWrapper} from "./style";
import {SnackbarEvent} from "./code/SnackbarEvent";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";

const SnackbarContainer: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()

    const [snackbarState, setSnackbarState] = useState<{
        open: boolean,
        message: string,
        alertType: string,
        callback?: Function,
        isVersionSnackbar: boolean
    }>({
        open: false,
        alertType: "success",
        message: "",
        isVersionSnackbar: false
    })

    useEffect(() => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.subscribe(SHOW_SNACKBAR_EVENT, snackbarEventHandler)
        eventBus.subscribe(SHOW_NEW_VERSION_EVENT, showNewVersionEventHandler)

        return () => {
            eventBus.unsubscribe(SHOW_SNACKBAR_EVENT, snackbarEventHandler)
            eventBus.unsubscribe(SHOW_NEW_VERSION_EVENT, showNewVersionEventHandler)
        }
    }, [])

    const snackbarEventHandler = (events: any[]) => {
        const event: SnackbarEvent = events[0] as SnackbarEvent
        const {message, alertType, callback} = event
        setSnackbarState({
            isVersionSnackbar: false,
            open: true,
            message: message,
            alertType: alertType,
            callback: callback
        });
    }

    const showNewVersionEventHandler = (events: any[]) => {
        const event: SnackbarEvent = events[0] as SnackbarEvent
        const {message, alertType, callback} = event
        setSnackbarState({
            open: true,
            message: message,
            alertType: alertType,
            callback: callback,
            isVersionSnackbar: true
        });
    }

    const handleCloseSnackbar = (event: object, reason: string) => {
        if (reason === "timeout")
            setSnackbarState({...snackbarState, open: false});
    };

    const handleClose = () => {
        setSnackbarState({...snackbarState, open: false});
    };

    const {open, message, callback, alertType, isVersionSnackbar} = snackbarState;

    const reload = () => {
        location.reload();
        return false;
    }

    const updateVersionAction = (
        <Button color="primary" size="small" onClick={reload}>
            {t('update')}
        </Button>
    )
    return (
        <SnackbarWrapper>
            <Snackbar
                style={{position: "absolute", alignContent: "center"}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleCloseSnackbar}
                autoHideDuration={isVersionSnackbar ? null : 5000}>
                <Alert onClose={handleClose}
                       severity={alertType}
                       style={{verticalAlign: "middle"}}
                       closeText={t('close')}
                       action={isVersionSnackbar ? updateVersionAction : null}>
                    {message}
                </Alert>
            </Snackbar>
            <div>
                {props.children}
            </div>
        </SnackbarWrapper>
    )
}
export default withTheme(SnackbarContainer)