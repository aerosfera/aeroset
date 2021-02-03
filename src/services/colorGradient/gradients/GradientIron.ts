// @ts-nocheck
import {RGBA} from "../../../views/types/RGBA";
import {ColorLabel} from "../ColorLabel";
import {Gradient} from "./Graidient";

export class GradientIron extends Gradient {
    constructor() {
        super();

        super.Name = 'Iron';
        super.BelowLimitColor = new RGBA(255, 255, 255);
        super.Labels = [
            new ColorLabel(0, new RGBA(255, 255, 255)),
            new ColorLabel(15, new RGBA(250, 230, 35)),
            new ColorLabel(30, new RGBA(250, 185, 0)),
            new ColorLabel(50, new RGBA(240, 80, 35)),
            new ColorLabel(67, new RGBA(170, 10, 170)),
            new ColorLabel(90, new RGBA(15, 5, 100)),
            new ColorLabel(100, new RGBA(0, 0, 0))
        ];
        super.AboveLimitColor = new RGBA(0, 0, 0);
    };

}