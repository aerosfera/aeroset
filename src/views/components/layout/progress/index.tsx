import React, {Component, useEffect, useState} from 'react';
import {ThemeProvider, withTheme} from "styled-components";
import {createMuiTheme, Theme} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import IoC from "../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../environment/ioc/ServiceTypes";
import {START_PROGRESS_EVENT, STOP_PROGRESS_EVENT} from "../../../../services/eventBus/EventTypes";
import {SnackbarEvent} from "../../snackbar/code/SnackbarEvent";
import {ProgressContainer} from "./style";
import {purple} from "@material-ui/core/colors";

const Progress: React.FC<{ theme: Theme }> = (props) => {
    const [state, setState] = useState<{
        title: string,
        isOpen: boolean
    }>({
        title: "",
        isOpen: false
    })
    useEffect(() => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        eventBus.subscribe(START_PROGRESS_EVENT, startProgressHandler)
        eventBus.subscribe(STOP_PROGRESS_EVENT, stopProgressHandler)

        return () => {
            eventBus.unsubscribe(START_PROGRESS_EVENT, startProgressHandler)
            eventBus.unsubscribe(STOP_PROGRESS_EVENT, stopProgressHandler)
        }
    })

    function startProgressHandler(events: any[]) {
        const title: string = events[0] as string
        setState({title: title, isOpen: true})
    }

    function stopProgressHandler(events: any[]) {
        const title: string = events[0] as string
        setState({title: "", isOpen: false})
    }

    const {title, isOpen} = state
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
            <ProgressContainer isOpen={isOpen}>
                <LinearProgress title={title} color={"secondary"}/>
            </ProgressContainer>
        </ThemeProvider>
    );
}

export default withTheme(Progress);