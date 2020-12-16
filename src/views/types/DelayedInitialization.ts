import {Camera, Scene} from "@babylonjs/core";

export interface DelayedInitialization {
    initialize: (data: GuiEngineData) => void
}

export interface GuiEngineData {
    scene: Scene,
    canvas: HTMLCanvasElement,
    camera: Camera
}