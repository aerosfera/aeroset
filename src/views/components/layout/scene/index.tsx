import React, {Component, useEffect, useState} from 'react';
import 'pepjs';
import isCanvasSupported from "../../../../utilities/dom/isCanvasSupported";
import {withTheme} from "styled-components";
import {Canvas} from "./style";
import PointCloud from "../pointCloudSystem";
import {Hidden, Theme} from "@material-ui/core";
import Panels from "../panels";
import {ThemeColors} from "../../theme/ThemeColors";
import {themeColor} from "../../theme/themeAccessors";
import ApiProvider from "../../../../services/apiProvider/ApiProvider";
import {Engine} from "@babylonjs/core/Engines/engine";
import setupScene from "./code/setupScene";
import {ArcRotateCamera, Light} from "@babylonjs/core";
import setupCamera from "./code/setupCamera";
import setupLight from "./code/setupLight";
import setupZoom from "./code/setupZoom";
import IoC from "../../../../environment/ioc/IoC";
import Scheme from "../scheme";

const Scene: React.FC<{ theme: Theme }> = (props) => {
    let scene;

    async function initialize(canvas: HTMLCanvasElement) {
        if (!isCanvasSupported()) {
            console.error('Canvas is not supported!');
            alert('Canvas is not supported!');
            return
        }

        const bgColor = themeColor(ThemeColors.lightGraySecond)(props);

        const apiProvider: ApiProvider = IoC.get(Symbol.for("API_PROVIDER_SERVICE"));
        const sceneAspects = apiProvider.root;

        const engine: Engine = new Engine(canvas, true);
        sceneAspects.engine = engine;

        scene = setupScene(engine, canvas, bgColor);
        sceneAspects.scene = scene;

        const camera: ArcRotateCamera = setupCamera(canvas, scene);
        sceneAspects.camera = camera;

        const light: Light = setupLight(scene);
        sceneAspects.light = light;

        setupZoom(scene, engine, camera);
    }


    return (
        <div id="canvasContainer">
            <Canvas
                ref={canvas => {
                    if (canvas != undefined && canvas) {
                        initialize(canvas);
                    }
                }}
            />
            <PointCloud/>
            <Scheme Scene={scene}/>
            <Hidden smDown>
                <Panels/>
            </Hidden>
        </div>

    )
}

export default withTheme(Scene);
