// @ts-nocheck
import {RGBA} from "../../../views/types/RGBA";
import {ColorLabel} from "../ColorLabel";
import {Gradient} from "./Graidient";

export class GradientAeroset extends Gradient{

    constructor() {
        super();

        super.Name = 'Aeroset';
        super.BelowLimitColor = new RGBA(255, 255, 255);

        super.AboveLimitColor = new RGBA(38, 38, 38);
        super.Labels = [
            new ColorLabel(0, new RGBA(249, 30, 30)),
            new ColorLabel(10, new RGBA(252, 102, 28)),
            new ColorLabel(30, new RGBA(242, 235, 38)),
            new ColorLabel(50, new RGBA(38, 242, 84)),
            new ColorLabel(70, new RGBA(28, 252, 204)),
            new ColorLabel(90, new RGBA(28, 173, 252)),
            new ColorLabel(100, new RGBA(28, 56, 252))
        ];
    };

}