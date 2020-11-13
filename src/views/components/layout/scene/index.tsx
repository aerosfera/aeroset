import React, {Component, useState} from 'react';
import * as BABYLON from 'babylonjs';
import IoC from "../../../../environment/ioc/IoC";
import isCanvasSupported from "../../../../utilities/dom/isCanvasSupported";
import setupScene from "./code/setupScene";
import setupCamera from "./code/setupCamera";
import setupLight from "./code/setupLight";
import {Engine} from "babylonjs/Engines/engine";
import {Light} from "babylonjs/Lights/light";
import {ArcRotateCamera} from "babylonjs/Cameras/arcRotateCamera";
import setupZoom from "./code/setupZoom";
import ApiProvider from "../../../../services/apiProvider/ApiProvider";
import {withTheme} from "styled-components";
import {Canvas} from "./style";
import PointCloud from "../pointCloudSystem";
import {Hidden, Theme} from "@material-ui/core";
import Panels from "../panels";
import 'pepjs';

const Scene: React.FC<{ theme: Theme }> = (props) => {
    function initialize(canvas: HTMLCanvasElement) {
        if (!isCanvasSupported()) {
            console.log('canvas is not supported!');
            alert('canvas is not supported!');
        }
        const apiProvider: ApiProvider = IoC.get(Symbol.for("API_PROVIDER_SERVICE"));
        const sceneAspects = apiProvider.scene;

        const engine: Engine = new BABYLON.Engine(canvas, true);
        sceneAspects.engine = engine;

        const theme = props.theme;
        const scene: BABYLON.Scene = setupScene(engine, theme);
        sceneAspects.scene = scene;

        const camera: ArcRotateCamera = setupCamera(canvas, scene);
        sceneAspects.camera = camera;

        const light: Light = setupLight(scene);
        sceneAspects.light = light;

        setupZoom(scene, engine, camera);
    }


    return (
        <div onPointerDown={(e) => console.log(e)}>
            <Canvas
                ref={canvas => {
                    if (canvas != undefined && canvas) {
                        initialize(canvas);
                    }
                }}
            />
            <PointCloud/>
            <Hidden smDown>
                <Panels/>
            </Hidden>
        </div>
    )
}

export default withTheme(Scene);
