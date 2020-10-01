import React, {Fragment} from "react";
import IconButton from "@material-ui/core/IconButton";
import {ThemeProvider} from "styled-components";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import Tooltip from "@material-ui/core/Tooltip";
import CloudSystemFiltersWindowPanel from "../../windowPanels/cloudSystemFiltersPanel/CloudSystemFiltersWindowPanel";
import * as EventTypes from "../../../../constants/eventTypes/EventTypes";

function instrumentalPanel() {
    function loadCloudSystemFile(e) {
        e.preventDefault();
    };

    function showCloudSystemFiltersPanel() {
        const filtersPanel = CloudSystemFiltersWindowPanel();
        filtersPanel.open = true;
    }

    const redTheme = createMuiTheme({palette: {primary: green}});

    return (
        <ThemeProvider theme={redTheme}>
            <div style={{height: 35, background: "#ef8354"}}>
                <Fragment>
                    <input
                        color="primary"
                        type="file"
                        onChange={(e) => loadCloudSystemFile(e)}
                        id="icon-button-file"
                        style={{display: 'none',}}/>
                    <Tooltip title="Загрузить файл с облаком точек" style={{marginLeft: 5}}>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                variant="contained"
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