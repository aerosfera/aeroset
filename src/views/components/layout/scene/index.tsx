import React, {Component, useEffect, useMemo, useRef, useState} from 'react';
import 'pepjs';
import isCanvasSupported from "../../../../utilities/dom/isCanvasSupported";
import {withTheme} from "styled-components";
import {Canvas} from "./style";
import PointCloud from "../pointCloudSystem";
import {Hidden, Theme} from "@material-ui/core";
import Panels from "../panels";
import {ThemeColors} from "../../theme/ThemeColors";
import {themeColor} from "../../theme/themeAccessors";
import {Engine} from "@babylonjs/core/Engines/engine";
import setupScene from "./code/setupScene";
import {ArcRotateCamera, Camera, Light, Scene} from "@babylonjs/core";
import setupCamera from "./code/setupCamera";
import setupLight from "./code/setupLight";
import setupZoom from "./code/setupZoom";
import AppScheme from "../scheme";
import {DelayedInitialization, GuiEngineData} from "../../../types/DelayedInitialization";

const AppScene: React.FC<{ theme: Theme }> = (props) => {
    const pointCloudEl = useRef<DelayedInitialization>(null)
    const schemeEl = useRef<DelayedInitialization>(null)
    const canvasEl = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasEl.current)
            initialize(canvasEl.current)
    }, [])

    const initialize = async (canvas: HTMLCanvasElement) => {
        if (!isCanvasSupported()) {
            console.error('Canvas is not supported!');
            alert('Canvas is not supported!');
            return
        }

        const bgColor = themeColor(ThemeColors.lightGraySecond)(props);
        const engine: Engine = new Engine(canvas, true);
        const scene: Scene = setupScene(engine, canvas, bgColor);
        const camera: ArcRotateCamera = setupCamera(canvas, scene);
        setupLight(scene);
        setupZoom(scene, engine, camera);

        const engineData : GuiEngineData = {
            camera: camera,
            canvas: canvas,
            scene: scene
        };

        if (schemeEl.current)
            schemeEl.current.initialize(engineData)

        if (pointCloudEl.current)
            pointCloudEl.current.initialize(engineData)
    }

    return (
        <div id="canvasContainer">
            <Canvas ref={canvasEl}/>
            <PointCloud ref={pointCloudEl}/>
            <AppScheme ref={schemeEl}/>
            <Hidden smDown>
                <Panels/>
            </Hidden>
        </div>

    )
}

export default withTheme(AppScene);
