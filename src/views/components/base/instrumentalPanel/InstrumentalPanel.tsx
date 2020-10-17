import 'reflect-metadata';
import React, {Fragment} from "react";
import IconButton from "@material-ui/core/IconButton";
import {ThemeProvider} from "styled-components";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import Tooltip from "@material-ui/core/Tooltip";
import {useSelector} from "react-redux";
import {ApplicationState, useAppDispatch} from "../../../../store/store";
import { pointCloudLoadFile, showPointCloudFiltersPanel } from "../../../../store/ui/sections/pointCloudSection/pointCloudSection";

export const InstrumentalPanel = () => {
    const instrumentalPanelState = useSelector<ApplicationState>(state => state);
    const dispatch = useAppDispatch();

    const redTheme = createMuiTheme({palette: {primary: green}});
    return (
        <ThemeProvider theme={redTheme}>
            <div style={{height: 35, background: "#c3aed6"}}>
                <Fragment>
                    <input
                        color="primary"
                        type="file"
                        onChange={(e) => {
                            e.preventDefault();
                            const file: File = e.target.files?.[0] as File;
                            if (file && file !== undefined) {
                                dispatch(pointCloudLoadFile(file));
                            }
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
                                onClick={() =>
                                    dispatch(showPointCloudFiltersPanel())}
                                style={{verticalAlign: "bottom", marginLeft: 10}}>
                        <FilterTiltShiftIcon style={{color: "white"}}/>
                    </IconButton>
                </Tooltip>
            </div>
        </ThemeProvider>
    );
};