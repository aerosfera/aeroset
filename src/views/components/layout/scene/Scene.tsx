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
import setUpPointCloud from "./pointCloudSystem/setUpPointCloud";
import SceneRootApi from "./base/SceneRootApi";
import ApiProvider from "../../../../services/apiProvider/ApiProvider";
import {Particle} from "babylonjs/Particles/particle";
import * as ServiceTypes from "../../../../environment/ioc/ServiceTypes";
import Draggable from 'react-draggable';
import {connect, Selector, useDispatch, useSelector} from "react-redux";
import {ApplicationState, useAppDispatch} from "../../../../store/store";
import WindowPanels from "./WindowPanels";
import {createSelector} from "@reduxjs/toolkit";
import {
    getPointCloudFiltersPanelSelector,
    PointCloudFiltersState
} from "../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import PointCloud from "./pointCloudSystem/PointCloud";


const Scene = () => {
    const dispatch = useAppDispatch();

    // const eventBus: EventBusService = IoC.get(Symbol.for("EVENT_BUS_SERVICE"));
    // eventBus.subscribe(EventTypes.CLOUD_POINTS_FILE_LOADED.toString(), onCloudPointsFileLoaded);

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
    }

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
            <div>
                <canvas
                    style={{
                        outline: "none",
                        display: "block", //remove scrollBars,
                        margin: 0,
                        height: '100%',
                        width: '100%',
                    }}
                    ref={canvas => {
                        if (canvas != undefined && canvas) {
                            initialize(canvas);
                        }
                    }}
                />
                {/*<PointCloud/>*/}
                {/*<WindowPanels/>*/}
            </div>
    )
}

export default Scene;
