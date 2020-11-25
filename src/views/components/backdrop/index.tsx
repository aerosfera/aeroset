import React, {useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createMuiTheme, Theme} from "@material-ui/core";
import {ThemeProvider, withTheme} from "styled-components";
import IoC from "../../../environment/ioc/IoC";
import {EventBusService} from "../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../environment/ioc/ServiceTypes";
import {
    CLOSE_BACKDROP_EVENT,
    SHOW_BACKDROP_EVENT
} from "../../../services/eventBus/EventTypes";
import {purple} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Backdrop: React.FC<{ theme: Theme }> = (props) => {
    const classes = useStyles();

    const [backdropState, setBackdropState] = useState<{
        open: boolean,
        message: string
    }>({
        open: false,
        message: ""
    })

    useEffect(() => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.subscribe(SHOW_BACKDROP_EVENT, backdropEventHandler)
        eventBus.subscribe(CLOSE_BACKDROP_EVENT, closeBackdropEventHandler)

        return () => {
            eventBus.unsubscribe(SHOW_BACKDROP_EVENT, backdropEventHandler)
            eventBus.unsubscribe(CLOSE_BACKDROP_EVENT, closeBackdropEventHandler)
        }
    }, [])

    function backdropEventHandler(events: any[]) {
        const eventMessage: string = events[0] as string
        setBackdropState({open: true, message: eventMessage})
    }

    function closeBackdropEventHandler(events: any[]) {
        setBackdropState({open: false, message: ""})
    }

    const {open, message} = backdropState
    // @ts-ignore
    const innerTheme = createMuiTheme({
        palette: {
            primary: {
                main: purple[500],
            },
            secondary: {
                main: '#42baf5'
            }
        },
    });

    return (
        <ThemeProvider theme={innerTheme}>
            <Backdrop open={open} className={classes.backdrop}>
                <CircularProgress color="secondary"/>
            </Backdrop>
        </ThemeProvider>
    )
}

export default withTheme(Backdrop)