// @ts-nocheck
import {RGBA} from "../RGBA";
import {ColorLabel} from "../ColorLabel";
import {Gradient} from "./Graidient";

export class GradientDefault extends Gradient {
    constructor() {
        super();

        super.Name = 'Default';
        super.BelowLimitColor = new RGBA(255, 255, 255);
        super.Labels = [
            new ColorLabel(0, new RGBA(255, 0, 0)),
            new ColorLabel(25, new RGBA(255, 255, 0)),
            new ColorLabel(50, new RGBA(0, 255, 0)),
            new ColorLabel(75, new RGBA(0, 255, 255)),
            new ColorLabel(100, new RGBA(0, 0, 255))
        ];
        super.AboveLimitColor = new RGBA(0, 0, 0);
    };

}