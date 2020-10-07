import React, {Component, useState} from 'react';
//import * as BABYLON from '@babylonjs/core/Legacy/legacy';
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
import ServiceTypes from "../../../../environment/ioc/ServiceTypes";
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

export default function Scene() {
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

    const state = {
        filterXFromLimit: -5,
        filterXToLimit: 5,
        filterYFromLimit: -5,
        filterYToLimit: 5,
        filterZFromLimit: -5,
        filterZToLimit: 5
    };

    let eventBus: EventBusService = IoC.get(ServiceTypes.EventBusService);
    eventBus.subscribe(EventTypes.CLOUD_POINTS_FILE_LOADED.toString(), onCloudPointsFileLoaded);

    function initialize(canvas: HTMLCanvasElement) {
        if (!isCanvasSupported()) {
            console.log('canvas is not supported!');
            alert('canvas is not supported!');
        }
        const apiProvider : ApiProvider = IoC.get(Symbol.for("ApiProviderService"));
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
    }


    // SetupPcs(points)
    // {
    //     this.pointsCloudSystem = new BABYLON.PointsCloudSystem("pcs", this.scene);
    //     const diffP = this.parameterMax - this.parameterMin;
    //
    //     const filteredPoints = points.filter(p => {
    //         const {x, y, z} = p
    //
    //         if ((x >= this.state.filterXFromLimit && x <= this.state.filterXToLimit)
    //             &&
    //             (y >= this.state.filterYFromLimit && y <= this.state.filterYToLimit)
    //             &&
    //             (z >= this.state.filterZFromLimit && z <= this.state.filterZToLimit)) {
    //             return true;
    //         }
    //
    //         return false;
    //     });
    //
    //     let constructParticle = (particle, i, _) => {
    //         let point = filteredPoints[i];
    //         const pPercent = ((point.p - this.parameterMin) / diffP) * 100;
    //
    //         let r;
    //         let g;
    //         let b;
    //
    //         if (pPercent <= 0) {
    //             r = 0;
    //             g = 0;
    //             b = 0;
    //         } else if (pPercent > 0 && pPercent <= 25) {
    //             r = 255;
    //             g = 0 - ((0 - 255) / (0 - 25)) * (0 - pPercent);
    //             b = 0;
    //         } else if (pPercent > 25 && pPercent <= 50) {
    //             r = 255 - ((255 - 0) / (25 - 50)) * (25 - pPercent);
    //             g = 255;
    //             b = 0;
    //         } else if (pPercent > 50 && pPercent <= 75) {
    //             r = 0;
    //             g = 255;
    //             b = 0 - ((0 - 255) / (50 - 100)) * (50 - pPercent);
    //         } else if (pPercent > 75 && pPercent <= 100) {
    //             r = 0;
    //             g = 255 - ((255 - 0) / (75 - 100)) * (75 - pPercent);
    //             b = 255;
    //         } else if (pPercent > 100) {
    //             r = 0;
    //             g = 0;
    //             b = 0;
    //         }
    //
    //         particle.position = new BABYLON.Vector3(point.x, point.y, point.z);
    //         particle.color = new BABYLON.Color3(r / 255, g / 255, b / 255)
    //     }
    //
    //     this.pointsCloudSystem.addPoints(filteredPoints.length, constructParticle);
    //     await this.pointsCloudSystem.buildMeshAsync();
    // }
    //
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
