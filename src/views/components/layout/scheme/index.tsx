import React from 'react';
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {Scene} from '@babylonjs/core/scene';
import {useSelector} from "react-redux";
import {schemeFileLoadSelector} from "../../../../store/ui/sections/scheme/schemeSection";
import {processSchemeFile} from "./code/processSchemeFile";

const Scheme: React.FC<{ theme: Theme, scene: Scene }> = (props) => {
    const {scene} = props
    const data: File | null = useSelector(schemeFileLoadSelector)

    if (data && data !== null) {
        processSchemeFile(data, scene)
    }
    return (
        <div id="schemeContainer">

        </div>
    )
}

export default withTheme(Scheme);
