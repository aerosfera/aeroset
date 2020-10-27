import {Selector, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import * as React from "react";
import {setUpPointCloud} from "./code/constructPointCloud";
import {
    getPointCloudFiltersPanelSelector,
    PointCloudFiltersState
} from "../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {ApplicationState} from "../../../../store/store";
import {PointCloudContainer} from "./style";

const pointCloudFileSelector: Selector<ApplicationState, File | null> = state => state.ui.sections.pointCloudSection.pointsCloudFile;

const dataSelector = createSelector([getPointCloudFiltersPanelSelector, pointCloudFileSelector],
    (pointCloudFilters: PointCloudFiltersState, file: File | null) => {
        return {
            pointCloudFilters,
            file
        }
    })

const PointCloud = () => {
    const props = useSelector(dataSelector);
    const cloudPointFilters = props.pointCloudFilters
    const cloudPointFile = props.file

    if (cloudPointFile && cloudPointFile !== null)
        setUpPointCloud(cloudPointFile, cloudPointFilters)

    return (
        <PointCloudContainer/>
    )
}

export default PointCloud