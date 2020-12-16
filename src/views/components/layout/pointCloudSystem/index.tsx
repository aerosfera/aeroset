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
import {DelayedInitialization, GuiEngineData} from "../../../types/DelayedInitialization";

const pointCloudFileSelector: Selector<ApplicationState, File | null> = state => state.ui.sections.pointCloudSection.pointsCloudFile;

const dataSelector = createSelector([getPointCloudFiltersPanelSelector, pointCloudFileSelector],
    (pointCloudFilters: PointCloudFiltersState, file: File | null) => {
        return {
            pointCloudFilters,
            file
        }
    })

const PointCloud = forwardRef((props, ref: Ref<DelayedInitialization>) => {
    useImperativeHandle(ref, () => ({initialize}))
    const [state, setState] = useState<{ engineData: GuiEngineData | null }>({engineData: null})
    const {engineData} = state

    const data = useSelector(dataSelector);
    const cloudPointFilters = data.pointCloudFilters
    const cloudPointFile = data.file

    const initialize = async (engineData: GuiEngineData) => {
        setState({engineData})
    }
    const loadPointCloud = async () => {
        await setUpPointCloud(cloudPointFile as File, cloudPointFilters, (engineData as GuiEngineData).scene)
    }

    if (cloudPointFile) {
        loadPointCloud()
    }

    return (
        <PointCloudContainer/>
    )
})

export default PointCloud