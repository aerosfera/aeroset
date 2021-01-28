import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import {DelayedInitialization, GraphicData} from "../../../types/DelayedInitialization";
import withTheme from "@material-ui/core/styles/withTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import AppSchemeCurrent from "./current";
import {Scene} from '@babylonjs/core/scene';
import {ArcRotateCamera} from "@babylonjs/core";
import AppSchemeLoadFromFile from "./file";
import AppSchemeLoading from "./load";

const AppScheme = forwardRef((props, ref: Ref<DelayedInitialization>) => {
    useImperativeHandle(ref, () => ({initialize}));

    const [state, setState] = useState<{ scene: Scene | null, camera: ArcRotateCamera | null }>({
        scene: null,
        camera: null
    })
    const {scene, camera} = state

    const initialize = async (engineData: GraphicData) => {
        const {scene} = engineData
        const camera = engineData.camera as ArcRotateCamera
        setState({scene, camera})
    }

    return (
        <React.Fragment>
            <AppSchemeLoadFromFile scene={scene} camera={camera}/>
            <AppSchemeLoading/>
            <AppSchemeCurrent scene={scene} />
        </React.Fragment>
    )
});

// @ts-ignore
export default withTheme(withStyles(null)(AppScheme));
