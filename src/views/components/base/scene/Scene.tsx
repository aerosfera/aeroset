import React, {Component, useState} from 'react';
import * as BABYLON from 'babylonjs';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {createMuiTheme} from '@material-ui/core/styles';
import {
    withStyles,
    MuiThemeProvider
} from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as eventTypes from "../../../../services/eventBus/EventTypes";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import IoC from "../../../../environment/ioc/IoC";
import * as EventTypes from "../../../../services/eventBus/EventTypes";
import isCanvasSupported from "../../../../utilities/dom/isCanvasSupported";
import setupScene from "./setup/scene/setupScene";
import setupCamera from "./setup/camera/setupCamera";
import setupLight from "./setup/light/setupLight";
import {Engine} from "babylonjs/Engines/engine";
import {Light} from "babylonjs/Lights/light";
import {ArcRotateCamera} from "babylonjs/Cameras/arcRotateCamera";
import setupZoom from "./setup/scene/setupZoom";
import onCloudPointsFileLoaded from "./pointCloudSystem/onCloudPointsFileLoaded";
import SceneRootApi from "./base/SceneRootApi";
import ApiProvider from "../../../../services/apiProvider/ApiProvider";
import {Particle} from "babylonjs/Particles/particle";
import * as ServiceTypes from "../../../../environment/ioc/ServiceTypes";
import Draggable from 'react-draggable';
import {connect, useDispatch, useSelector} from "react-redux";
import {ApplicationState, useAppDispatch} from "../../../../store/store";

const Scene = () => {
    const selector: ApplicationState = useSelector((state: ApplicationState) => state);
    const dispatch = useAppDispatch();

    const eventBus: EventBusService = IoC.get(Symbol.for("EVENT_BUS_SERVICE"));
    eventBus.subscribe(EventTypes.CLOUD_POINTS_FILE_LOADED.toString(), onCloudPointsFileLoaded);

    function initialize(canvas: HTMLCanvasElement) {
        if (!isCanvasSupported()) {
            console.log('canvas is not supported!');
            alert('canvas is not supported!');
        }
        const apiProvider: ApiProvider = IoC.get(Symbol.for("API_PROVIDER_SERVICE")); //Todo: understand why
        const sceneRootApi = apiProvider.sceneRootApi;

        const engine: Engine = new BABYLON.Engine(canvas, true);
        sceneRootApi.engine = engine;

        const scene: BABYLON.Scene = setupScene(engine);
        sceneRootApi.scene = scene;

        const camera: ArcRotateCamera = setupCamera(canvas, scene);
        sceneRootApi.camera = camera;

        const light: Light = setupLight(scene);
        sceneRootApi.light = light;

        setupZoom(scene, engine, camera);

        const pointsCloudFile: File = selector.instrumentalPanel.pointCloudSystem.pointsCloudFile as File;
        if (pointsCloudFile && pointsCloudFile !== null)
            onCloudPointsFileLoaded(new Array<File>(pointsCloudFile));
    }

    // InputOnChangeHandle(event)
    // {
    //     const target = event.target;
    //     const inputType = target.name;
    //     const value = target.value;
    //
    //     const constructNewFilteredPCS = async () => {
    //         if (this.pointsCloudSystem !== undefined) {
    //             this.pointsCloudSystem.dispose();
    //         }
    //
    //         if (typeof this.points !== 'undefined' && this.points)
    //             await this.SetupPcs(this.points);
    //     }
    //
    //     if (inputType === "x-from") {
    //         this.setState(prevState => ({
    //             filterXFromLimit: value,
    //             filterXToLimit: prevState.filterXToLimit,
    //             filterYFromLimit: prevState.filterYFromLimit,
    //             filterYToLimit: prevState.filterYToLimit,
    //             filterZFromLimit: prevState.filterZFromLimit,
    //             filterZToLimit: prevState.filterZToLimit,
    //         }), () => {
    //             constructNewFilteredPCS();
    //         });
    //
    //     } else if (inputType === "x-to") {
    //         this.setState(prevState => ({
    //             filterXFromLimit: prevState.filterXFromLimit,
    //             filterXToLimit: value,
    //             filterYFromLimit: prevState.filterYFromLimit,
    //             filterYToLimit: prevState.filterYToLimit,
    //             filterZFromLimit: prevState.filterZFromLimit,
    //             filterZToLimit: prevState.filterZToLimit,
    //         }), () => {
    //             constructNewFilteredPCS();
    //         });
    //     } else if (inputType === "y-from") {
    //         this.setState(prevState => ({
    //             filterXFromLimit: prevState.filterXFromLimit,
    //             filterXToLimit: prevState.filterXToLimit,
    //             filterYFromLimit: value,
    //             filterYToLimit: prevState.filterYToLimit,
    //             filterZFromLimit: prevState.filterZFromLimit,
    //             filterZToLimit: prevState.filterZToLimit,
    //         }), () => {
    //             constructNewFilteredPCS();
    //         });
    //     } else if (inputType === "y-to") {
    //         this.setState(prevState => ({
    //             filterXFromLimit: prevState.filterXFromLimit,
    //             filterXToLimit: prevState.filterXToLimit,
    //             filterYFromLimit: prevState.filterYFromLimit,
    //             filterYToLimit: value,
    //             filterZFromLimit: prevState.filterZFromLimit,
    //             filterZToLimit: prevState.filterZToLimit,
    //         }), () => {
    //             constructNewFilteredPCS();
    //         });
    //     } else if (inputType === "z-from") {
    //         this.setState(prevState => ({
    //             filterXFromLimit: prevState.filterXFromLimit,
    //             filterXToLimit: prevState.filterXToLimit,
    //             filterYFromLimit: prevState.filterYFromLimit,
    //             filterYToLimit: prevState.filterYToLimit,
    //             filterZFromLimit: value,
    //             filterZToLimit: prevState.filterZToLimit,
    //         }), () => {
    //             constructNewFilteredPCS();
    //         });
    //     } else if (inputType === "z-to") {
    //         this.setState(prevState => ({
    //             filterXFromLimit: prevState.filterXFromLimit,
    //             filterXToLimit: prevState.filterXToLimit,
    //             filterYFromLimit: prevState.filterYFromLimit,
    //             filterYToLimit: prevState.filterYToLimit,
    //             filterZFromLimit: prevState.filterZFromLimit,
    //             filterZToLimit: value,
    //         }), () => {
    //             constructNewFilteredPCS();
    //         });
    //     }
    // }


    //    const FiltersContainer = styled(Card)`
    // padding: 1em;
    // background: ${theme.palette.background};
    // width: 250px;
    // height: 320px;
    // position: absolute;
    // `;

    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <canvas
                style={{
                    outline: "none",
                    display: "block", //remove scrollBars,
                    margin: 0,
                    width: '100%',
                    padding: 0,
                    height: (window.innerHeight - 130)
                }}
                ref={canvas => {
                    if (canvas != undefined && canvas) {
                        initialize(canvas);
                    }
                }}
            />

            {/*<FiltersContainer style={{top: 20, left: 20}}>*/}
            {/*    <Button*/}
            {/*        disableElevation*/}
            {/*        variant="outlined"*/}
            {/*        startIcon={<CloudUploadIcon/>}*/}
            {/*        style={{marginBottom: 24}}*/}
            {/*        component="label"*/}
            {/*        color="primary">*/}
            {/*        Upload File*/}
            {/*        <input*/}
            {/*            type="file"*/}
            {/*            ref={input => this.inputElement = input}*/}
            {/*            onChange={(e) => this.showFile(e)}*/}
            {/*            style={{display: "none"}}*/}
            {/*        />*/}
            {/*    </Button>*/}
            {/*    <Typography variant="h5">FILTERS</Typography>*/}
            {/*    <div style={{marginTop: 16}}>*/}
            {/*        <TextField*/}
            {/*            id="outlined-number"*/}
            {/*            label="X FROM"*/}
            {/*            type="number"*/}
            {/*            name={"x-from"}*/}
            {/*            step="0.1"*/}
            {/*            value={this.state.filterXFromLimit}*/}
            {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
            {/*            style={{width: 100, height: 20}}*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true,*/}
            {/*            }}*/}
            {/*            inputProps={{*/}
            {/*                step: 0.1*/}
            {/*            }}*/}
            {/*            variant="outlined"*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            id="outlined-number"*/}
            {/*            label="X TO"*/}
            {/*            type="number"*/}
            {/*            name={"x-to"}*/}
            {/*            step="0.1"*/}
            {/*            value={this.state.filterXToLimit}*/}
            {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
            {/*            style={{width: 100, marginLeft: 24}}*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true,*/}
            {/*            }}*/}
            {/*            inputProps={{*/}
            {/*                step: 0.1*/}
            {/*            }}*/}
            {/*            variant="outlined"/>*/}
            {/*    </div>*/}
            {/*    <div style={{marginTop: 12}}>*/}
            {/*        <TextField*/}
            {/*            id="outlined-number"*/}
            {/*            label="Y FROM"*/}
            {/*            type="number"*/}
            {/*            name={"y-from"}*/}
            {/*            step="0.1"*/}
            {/*            value={this.state.filterYFromLimit}*/}
            {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
            {/*            style={{width: 100, height: 20}}*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true,*/}
            {/*            }}*/}
            {/*            inputProps={{*/}
            {/*                step: 0.1*/}
            {/*            }}*/}
            {/*            variant="outlined"*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            id="outlined-number"*/}
            {/*            label="Y TO"*/}
            {/*            type="number"*/}
            {/*            name={"y-to"}*/}
            {/*            step="0.1"*/}
            {/*            value={this.state.filterYToLimit}*/}
            {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
            {/*            style={{width: 100, marginLeft: 24}}*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true,*/}
            {/*            }}*/}
            {/*            inputProps={{*/}
            {/*                step: 0.1*/}
            {/*            }}*/}
            {/*            variant="outlined"/>*/}
            {/*    </div>*/}
            {/*    <div style={{marginTop: 12}}>*/}
            {/*        <TextField*/}
            {/*            id="outlined-number"*/}
            {/*            label="Z FROM"*/}
            {/*            type="number"*/}
            {/*            name={"z-from"}*/}
            {/*            step="0.1"*/}
            {/*            value={this.state.filterZFromLimit}*/}
            {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
            {/*            style={{width: 100, height: 20}}*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true*/}
            {/*            }}*/}
            {/*            inputProps={{*/}
            {/*                step: 0.1*/}
            {/*            }}*/}
            {/*            variant="outlined"*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            id="outlined-number"*/}
            {/*            label="Z TO"*/}
            {/*            type="number"*/}
            {/*            name={"z-to"}*/}
            {/*            step="0.1"*/}
            {/*            value={this.state.filterZToLimit}*/}
            {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
            {/*            style={{width: 100, marginLeft: 24}}*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true,*/}
            {/*            }}*/}
            {/*            inputProps={{*/}
            {/*                step: 0.1*/}
            {/*            }}*/}
            {/*            variant="outlined"/>*/}
            {/*    </div>*/}
            {/*</FiltersContainer>*/}
        </MuiThemeProvider>
    )
}

export default Scene;
