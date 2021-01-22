import {Camera, Scene} from "@babylonjs/core";

export interface DelayedInitialization {
    initialize: (data: GraphicData) => void
}

export interface GraphicData {
    scene: Scene,
    canvas: HTMLCanvasElement,
    camera: Camera
}