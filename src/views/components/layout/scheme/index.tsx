import React from 'react';
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {Scene} from '@babylonjs/core/scene';
import {useSelector} from "react-redux";
import {schemeFileLoadSelector} from "../../../../store/ui/sections/scheme/schemeSection";
import {parseSchemeFileAsync} from "./code/parseSchemeFileAsync";
import Scheme from "../../../../models/scheme/Scheme";
import {loadSchemeFileToSceneAsync} from "./code/loadSchemeToSceneAsync";
import {SchemeMode} from "../../../types/SchemeMode";

const AppScheme: React.FC<{ theme: Theme, scene: Scene }> = (props) => {
    const {scene} = props
    const data: File | null = useSelector(schemeFileLoadSelector)

    const initialize = async (file: File) => {
        //Todo: to saga
        const scheme: Scheme = await parseSchemeFileAsync(file)
        await loadSchemeFileToSceneAsync(scheme, scene, SchemeMode.Topology)
    }

    if (data && data !== null) {
        initialize(data)
    }
    return (
        <div>
            {/*empty*/}
        </div>
    )
}

export default withTheme(AppScheme);
