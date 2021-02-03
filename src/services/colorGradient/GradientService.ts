import {RGBA} from "../../views/types/RGBA";
import {GradientDefault} from "./gradients/GradientDefault";
import {GradientIron} from "./gradients/GradientIron";
import {GradientAeroset} from "./gradients/GradientAeroset";
import {Gradient} from "./gradients/Graidient";
import {ColorLabel} from "./ColorLabel";
import {injectable} from "inversify";

@injectable()
class ColorGradientService {
    private gradientTypes: (GradientDefault | GradientIron | GradientAeroset)[];
    private Gradient: Gradient = new GradientDefault();
    private MinParameter: number = -100;
    private MaxParameter: number = 100;

    constructor(gradientType = 'Default', minParameter = -100, maxParameter = 100) {
        this.gradientTypes = [
            new GradientDefault(),
            new GradientIron(),
            new GradientAeroset()
        ];
        this.setGradient(gradientType);
        this.setMinParameter(minParameter);
        this.setMaxParameter(maxParameter);
    };

    public setGradient(gradientType: string) {
        this.Gradient = <Gradient>this.gradientTypes.find(gradient => gradient.Name === gradientType);
    };

    public setMinParameter(minParameter: number) {
        this.MinParameter = minParameter;
    };

    public setMaxParameter(maxParameter: number) {
        this.MaxParameter = maxParameter;
    };


    public getColor(parameter: number) {

        // Calculate parameter position on the gradient scale (%)
        let parameterPosition = (parameter - this.MinParameter) / (this.MaxParameter - this.MinParameter) * 100;

        if (parameterPosition < 0) {
            return this.Gradient.BelowLimitColor;
        }

        if (parameterPosition > 100) {
            return this.Gradient.AboveLimitColor;
        }

        let previousLabel = <ColorLabel>this.Gradient.Labels.sort((label1, label2) => label2.position - label1.position).find(label => label.position <= parameterPosition);

        let nextLabel = <ColorLabel>this.Gradient.Labels.sort((label1, label2) => label1.position - label2.position).find(label => label.position >= parameterPosition);

        if (previousLabel == nextLabel) {
            return previousLabel.color;
        } else {
            let red = Math.round(previousLabel.color.Red - (previousLabel.color.Red - nextLabel.color.Red) / (previousLabel.position - nextLabel.position) * (previousLabel.position - parameterPosition));
            let green = Math.round(previousLabel.color.Green - (previousLabel.color.Green - nextLabel.color.Green) / (previousLabel.position - nextLabel.position) * (previousLabel.position - parameterPosition));
            let blue = Math.round(previousLabel.color.Blue - (previousLabel.color.Blue - nextLabel.color.Blue) / (previousLabel.position - nextLabel.position) * (previousLabel.position - parameterPosition));
            let alpha = Math.round(previousLabel.color.Alpha - (previousLabel.color.Alpha - nextLabel.color.Alpha) / (previousLabel.position - nextLabel.position) * (previousLabel.position - parameterPosition));

            let color = new RGBA(red, green, blue, alpha);

            return (color);
        }
        ;

    };

    public getGradientAsCSSProperty(direction = 'to bottom') {

        let backgroundProperty = 'linear-gradient(' + direction + ', ';

        for (let label in this.Gradient.Labels) {
            backgroundProperty += ' rgba('
                + this.Gradient.Labels[label].color.Red + ','
                + this.Gradient.Labels[label].color.Green + ','
                + this.Gradient.Labels[label].color.Blue + ','
                + this.Gradient.Labels[label].color.Alpha + ') '
                + this.Gradient.Labels[label].position + '%, ';
        }
        ;

        backgroundProperty = backgroundProperty.slice(0, -2) + ')';

        return backgroundProperty;

    };
}

export default ColorGradientService;
