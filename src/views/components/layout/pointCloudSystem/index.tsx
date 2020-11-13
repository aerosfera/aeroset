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
import IoC from "../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../environment/ioc/ServiceTypes";
import {SHOW_SNACKBAR_EVENT, START_PROGRESS_EVENT, STOP_PROGRESS_EVENT} from "../../../../services/eventBus/EventTypes";
import {useTabContext} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

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

    if (cloudPointFile && cloudPointFile !== null){
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)

        eventBus.send(START_PROGRESS_EVENT, i18next.t('point_cloud_process'))
        setUpPointCloud(cloudPointFile, cloudPointFilters)
        eventBus.send(STOP_PROGRESS_EVENT, null)
    }
    return (
        <PointCloudContainer/>
    )
}

export default PointCloud