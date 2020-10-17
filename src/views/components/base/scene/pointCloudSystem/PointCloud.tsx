import {Selector, useSelector} from "react-redux";
import {ApplicationState} from "../../../../../store/store";
import {createSelector} from "@reduxjs/toolkit";
import {
    getPointCloudFiltersPanelSelector,
    PointCloudFiltersState
} from "../../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import setUpPointCloud from "./setUpPointCloud";
import * as React from "react";


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
        setUpPointCloud(cloudPointFile, cloudPointFilters);

    return (
        <div style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            background: "transparent",
            pointerEvents: "none"
        }}>
        </div>
    )
}

export default PointCloud