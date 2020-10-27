import React, {Component, useState} from 'react';
import * as BABYLON from 'babylonjs';
import IoC from "../../../../environment/ioc/IoC";
import isCanvasSupported from "../../../../utilities/dom/isCanvasSupported";
import setupScene from "./setup/scene/setupScene";
import setupCamera from "./setup/camera/setupCamera";
import setupLight from "./setup/light/setupLight";
import {Engine} from "babylonjs/Engines/engine";
import {Light} from "babylonjs/Lights/light";
import {ArcRotateCamera} from "babylonjs/Cameras/arcRotateCamera";
import setupZoom from "./setup/scene/setupZoom";
import ApiProvider from "../../../../services/apiProvider/ApiProvider";
import {ApplicationState, useAppDispatch} from "../../../../store/store";
import {withTheme} from "styled-components";
import {AppTheme} from "../../theme/theme";
import {prop} from "ramda";


const Scene: React.FC<{ theme: AppTheme }> = (props) => {
    function initialize(canvas: HTMLCanvasElement) {
        if (!isCanvasSupported()) {
            console.log('canvas is not supported!');
            alert('canvas is not supported!');
        }
        const apiProvider: ApiProvider = IoC.get(Symbol.for("API_PROVIDER_SERVICE")); //Todo: understand why
        const sceneApi = apiProvider.scene;

        const engine: Engine = new BABYLON.Engine(canvas, true);
        sceneApi.engine = engine;

        const theme = props.theme;
        const scene: BABYLON.Scene = setupScene(engine, theme);
        sceneApi.scene = scene;

        const camera: ArcRotateCamera = setupCamera(canvas, scene);
        sceneApi.camera = camera;

        const light: Light = setupLight(scene);
        sceneApi.light = light;

        setupZoom(scene, engine, camera);
    }

    return (
        <div>
            <canvas
                style={{
                    outline: "none",
                    display: "block", //remove scrollBars
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

export default withTheme(Scene);
