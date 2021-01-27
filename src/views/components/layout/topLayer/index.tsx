import * as React from "react";
import {withTheme} from "styled-components";
import withStyles from "@material-ui/core/styles/withStyles";
import {forwardRef, Ref, useImperativeHandle, useState} from "react";
import {DelayedInitialization, GraphicData} from "../../../types/DelayedInitialization";
import {Scene} from "@babylonjs/core/scene";
import AxisSubLayer from "./axisSubLayer";
import {OnCanvasContainerWithEvents} from "../shared/style"

const TopLayer = forwardRef((props, ref: Ref<DelayedInitialization>) => {
    useImperativeHandle(ref, () => ({initialize}));
    const [state, setState] = useState<{ scene: Scene | null }>({scene: null})
    const {scene} = state

    const initialize = (engineData: GraphicData) => {
        setState({scene: engineData.scene})
    }

    return (
        <OnCanvasContainerWithEvents>
            <AxisSubLayer scene={scene}/>
        </OnCanvasContainerWithEvents>
    );
});

// @ts-ignore
export default withTheme(withStyles(null)(TopLayer));