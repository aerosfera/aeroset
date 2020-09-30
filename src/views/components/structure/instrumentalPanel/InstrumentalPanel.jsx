import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {ThemeProvider} from "styled-components";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import Tooltip from "@material-ui/core/Tooltip";
import CloudSystemFiltersWindowPanel from "../../windowPanels/cloudSystemFiltersPanel/CloudSystemFiltersWindowPanel";

function instrumentalPanel() {
    function loadCloudSystemFile(){
        alert("dfs");
    }

    function showCloudSystemFiltersPanel(){
        const filtersPanel = CloudSystemFiltersWindowPanel();
        filtersPanel.open = true;
    }

    const redTheme = createMuiTheme({palette: {primary: green}});

    return (
        <ThemeProvider theme={redTheme}>
            <div style={{height: 35, background: "#ef8354"}}>
                <Tooltip title="Загрузить файл с облаком точек">
                    <IconButton size={"small"}
                                color={"primary"}
                                onClick={loadCloudSystemFile}
                                style={{verticalAlign: "bottom", marginLeft: 10}}>
                        <CloudUploadIcon style={{color: "white"}}/>
                    </IconButton>
                </Tooltip>
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