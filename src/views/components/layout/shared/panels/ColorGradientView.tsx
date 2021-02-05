import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import IoC from "../../../../../infrastructure/ioc/IoC";
import ColorGradientService from "../../../../../services/colorGradient/GradientService";
import {COLOR_GRADIENT_SERVICE} from "../../../../../infrastructure/ioc/ServiceTypes";
import {useSelector} from "react-redux";
import {schemeModelsColorGradientSelector} from "../../../../../store/ui/panels/models/schemeModelsPanel";

const ColorGradientView: React.FC<{ theme: Theme }> = (props) => {
    const gradient = useSelector(schemeModelsColorGradientSelector);

    const colorGradientService = IoC.get<ColorGradientService>(COLOR_GRADIENT_SERVICE);
    const linearGradientCss = colorGradientService.getGradientAsCSSProperty();

    return (
        <div style={{background: linearGradientCss, height: 150, width: 50, marginTop: 16, marginLeft: 16}}/>
    );
}

export default withTheme(ColorGradientView);