import React from 'react';
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {Scene} from '@babylonjs/core/scene';
import BuildRibSquareInfo from "./code/BuildRibSquareInfo";
import SolidPoint from "../pointCloudSystem/code/SolidPoint";

const Scheme: React.FC<{ theme: Theme, scene: Scene }> = (props) => {
    const {scene} = props

    const buildInfo: BuildRibSquareInfo = {
        startPoint: new SolidPoint(0, 0, 0),
        endPoint: new SolidPoint(10,10,10),
        height: 5,
        width: 10
    }

    return (
        <div id="schemeContainer">

        </div>
    )
}

export default withTheme(Scheme);
