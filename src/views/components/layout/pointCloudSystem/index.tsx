import {Selector, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import * as React from "react";
import {
    pointCloudPanelSelector,
    PointCloudPanelState
} from "../../../../store/ui/panels/pointCloud/pointCloudPanel";
import {ApplicationState} from "../../../../store/store";
import {PointCloudContainer} from "./style";
import {setUpPointCloud} from "./code/setupPointCloud";
import {forwardRef, Ref, useImperativeHandle, useState} from "react";
import {DelayedInitialization, GraphicData} from "../../../types/DelayedInitialization";
import withStyles from "@material-ui/core/styles/withStyles";
import withTheme from "@material-ui/core/styles/withTheme";

const pointCloudFileSelector: Selector<ApplicationState, File | null> = state => state.ui.sections.pointCloud.pointsCloudFile;

const dataSelector = createSelector([pointCloudPanelSelector, pointCloudFileSelector],
    (pointCloudFilters: PointCloudPanelState, file: File | null) => {
        return {
            pointCloudFilters,
            file
        }
    })

const PointCloud = forwardRef((props, ref: Ref<DelayedInitialization>) => {
    useImperativeHandle(ref, () => ({initialize}))
    const [state, setState] = useState<{ engineData: GraphicData | null }>({engineData: null})
    const {engineData} = state

    const data = useSelector(dataSelector);
    const cloudPointFilters = data.pointCloudFilters
    const cloudPointFile = data.file

    const initialize = async (engineData: GraphicData) => {
        setState({engineData})
    }
    const loadPointCloud = async () => {
        await setUpPointCloud(cloudPointFile as File, cloudPointFilters, (engineData as GraphicData).scene)
    }

    if (cloudPointFile) {
        loadPointCloud()
    }

    return (
        <PointCloudContainer/>
    )
})

// @ts-ignore
export default withTheme(withStyles(null)(PointCloud))