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
import {DelayedInitialization, GraphicData} from "../../../types/DelayedInitialization";
import TopLayer from "../topLayer";
import IoC from "../../../../infrastructure/ioc/IoC";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE, INFRASTRUCTURE_SERVICE} from "../../../../infrastructure/ioc/ServiceTypes";
import {CANVAS_MOUSE_CLICK_EVENT} from "../../../../services/eventBus/EventTypes";
import setupEnvironment from "./code/setupEnvironment";
import InfrastructureService from "../../../../services/infrastructure/InfrastructureService";
import setupResources from "./code/setupResources";

const AppScene: React.FC<{ theme: Theme }> = (props) => {
    const pointCloudEl = useRef<DelayedInitialization>(null)
    const schemeEl = useRef<DelayedInitialization>(null)
    const panelsEl = useRef<DelayedInitialization>(null)
    const topLayerEl = useRef<DelayedInitialization>(null)
    const canvasEl = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasEl.current)
            initialize(canvasEl.current)

        return () => {
            if (canvasEl.current)
                canvasEl.current.onclick = null;
        }
    });

    const initialize = async (canvas: HTMLCanvasElement) => {
        if (!isCanvasSupported()) {
            console.error('Canvas is not supported!');
            alert('Canvas is not supported!');
            return
        }

        const engine: Engine = new Engine(canvas, true);
        const bgColor = themeColor(ThemeColors.lightGraySecond)(props);
        const scene: Scene = setupScene(engine, canvas, bgColor);
        const camera: ArcRotateCamera = setupCamera(canvas, scene);
        const light = setupLight(scene, camera);
        const resources = setupResources(scene);
        setupZoom(scene, engine, camera);

        const infrastructureService = IoC.get<InfrastructureService>(INFRASTRUCTURE_SERVICE);
        infrastructureService.engine = engine;
        infrastructureService.scene = scene;
        infrastructureService.camera = camera;
        infrastructureService.light = light;
        infrastructureService.resources = resources;

        const engineData: GraphicData = {
            camera: camera,
            canvas: canvas,
            scene: scene
        };

        if (schemeEl.current)
            schemeEl.current.initialize(engineData)

        if (pointCloudEl.current)
            pointCloudEl.current.initialize(engineData)

        if (panelsEl.current)
            panelsEl.current.initialize(engineData)

        if (topLayerEl.current)
            topLayerEl.current.initialize(engineData)

        canvas.onclick = canvasClickHandle;
    }

    const canvasClickHandle = (event: MouseEvent) => {
        const eventBusService = IoC.get<EventBusService>(EVENT_BUS_SERVICE);
        eventBusService.send(CANVAS_MOUSE_CLICK_EVENT, event)
    }

    return (
        <div id="canvasContainer">
            <Canvas ref={canvasEl}/>
            <AppScheme ref={schemeEl}/>
            <PointCloud ref={pointCloudEl}/>
            <Panels ref={panelsEl}/>
            <TopLayer ref={topLayerEl}/>
        </div>

    )
}

export default withTheme(AppScene);
