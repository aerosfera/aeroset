import * as React from "react";
import {withTheme} from "styled-components";
import PointCloudPanel from "./pointCloud";
import {Hidden, Theme} from "@material-ui/core";
import {PanelsContainer} from "./style";
import SchemePanel from "./scheme";
import withStyles from "@material-ui/core/styles/withStyles";
import {forwardRef, Ref, useImperativeHandle, useState} from "react";
import {DelayedInitialization, GraphicData} from "../../../types/DelayedInitialization";
import {Scene} from "@babylonjs/core/scene";

const Panels = forwardRef((props, ref: Ref<DelayedInitialization>) => {
    useImperativeHandle(ref, () => ({initialize}));
    const [state, setState] = useState<{ scene: Scene | null }>({scene: null})
    const {scene} = state

    const initialize = (engineData: GraphicData) => {
        setState({scene: engineData.scene})
    }

    return (
        <PanelsContainer>
            <Hidden smDown>
                <PointCloudPanel/>
                <SchemePanel scene={scene}/>
            </Hidden>
        </PanelsContainer>
    );
});

// @ts-ignore
export default withTheme(withStyles(null)(Panels));