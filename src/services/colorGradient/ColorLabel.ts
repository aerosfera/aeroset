import {RGBA} from "./RGBA";

export class ColorLabel {
    public position: number;
    public color: RGBA;

    constructor(position: number, color: RGBA) {
        this.position = position;
        this.color = color;
    };

}