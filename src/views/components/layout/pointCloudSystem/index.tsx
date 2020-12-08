import {Selector, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import * as React from "react";
import {
    getPointCloudFiltersPanelSelector,
    PointCloudFiltersState
} from "../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {ApplicationState} from "../../../../store/store";
import {PointCloudContainer} from "./style";
import {setUpPointCloud} from "./code/setupPointCloud";
import {Scene} from "@babylonjs/core";
import {forwardRef, Ref, useImperativeHandle, useState} from "react";
import { RefSceneObject } from "../scene";

const pointCloudFileSelector: Selector<ApplicationState, File | null> = state => state.ui.sections.pointCloudSection.pointsCloudFile;

const dataSelector = createSelector([getPointCloudFiltersPanelSelector, pointCloudFileSelector],
    (pointCloudFilters: PointCloudFiltersState, file: File | null) => {
        return {
            pointCloudFilters,
            file
        }
    })

const PointCloud = forwardRef((props, ref: Ref<RefSceneObject>) => {
    useImperativeHandle(ref, () => ({initialize}))
    const [state, setState] = useState<{ scene: Scene | null }>({scene: null})
    const {scene} = state

    const data = useSelector(dataSelector);
    const cloudPointFilters = data.pointCloudFilters
    const cloudPointFile = data.file

    const initialize = async (scene: Scene) => {
        setState({scene: scene})
    }
    const loadPointCloud = async () => {
        await setUpPointCloud(cloudPointFile as File, cloudPointFilters, scene as Scene)
    }

    if (cloudPointFile) {
        loadPointCloud()
    }

    return (
        <PointCloudContainer/>
    )
})

export default PointCloud