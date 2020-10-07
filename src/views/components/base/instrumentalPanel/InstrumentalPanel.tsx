import IoC from "../../../../environment/ioc/IoC";
import 'reflect-metadata';
import React, {Fragment} from "react";
import IconButton from "@material-ui/core/IconButton";
import {ThemeProvider} from "styled-components";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import Tooltip from "@material-ui/core/Tooltip";
import ServiceTypes from "../../../../environment/ioc/ServiceTypes";
import * as EventTypes from "../../../../services/eventBus/EventTypes";
import {EventBusService} from "../../../../services/eventBus/EventBusService";

function instrumentalPanel() {
    function loadCloudSystemFile(file: File) {
        let eventBus : EventBusService = IoC.get(ServiceTypes.EventBusService);
        eventBus.send(EventTypes.CLOUD_POINTS_FILE_LOADED.toString(),file);
    };

    function showCloudSystemFiltersPanel() {
    }

    const redTheme = createMuiTheme({palette: {primary: green}});
    return (

        <ThemeProvider theme={redTheme}>
            <div style={{height: 35, background: "#ef8354"}}>
                <Fragment>
                    <input
                        color="primary"
                        type="file"
                        onChange={(e) => {
                            e.preventDefault();
                            const file : File | undefined = e.target.files?.[0];
                            loadCloudSystemFile(file as File);
                        }}
                        id="icon-button-file"
                        style={{display: 'none',}}/>
                    <Tooltip title="Загрузить файл с облаком точек" style={{marginLeft: 5}}>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                component="span"
                                size="small"
                                color="primary">
                                <CloudUploadIcon style={{color: "white"}}/>
                            </IconButton>
                        </label>
                    </Tooltip>
                </Fragment>
                <Tooltip title="Открыть панель с фильтрами облака точек">
                    <IconButton size={"small"}
                                color={"primary"}
                                onClick={showCloudSystemFiltersPanel}
                                style={{verticalAlign: "bottom", marginLeft: 10}}>
                        <FilterTiltShiftIcon style={{color: "white"}}/>
                    </IconButton>
                </Tooltip>
            </div>
        </ThemeProvider>
    );
};

export default instrumentalPanel;