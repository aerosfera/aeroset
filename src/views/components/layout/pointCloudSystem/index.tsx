import {Selector, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import * as React from "react";
import {
    getPointCloudFiltersPanelSelector,
    PointCloudFiltersState
} from "../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {ApplicationState} from "../../../../store/store";
import {PointCloudContainer} from "./style";
import IoC from "../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../services/eventBus/EventBusService";
import {API_PROVIDER_SERVICE, EVENT_BUS_SERVICE} from "../../../../environment/ioc/ServiceTypes";
import {START_PROGRESS_EVENT, STOP_PROGRESS_EVENT} from "../../../../services/eventBus/EventTypes";
import i18next from "i18next";
import ApiProvider from "../../../../services/apiProvider/ApiProvider";
import {setUpPointCloud} from "./code/setupPointCloud";
import {Scene} from "@babylonjs/core";

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

    const initialize = async () => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
        const apiProvider = IoC.get<ApiProvider>(API_PROVIDER_SERVICE)

        //eventBus.send(START_PROGRESS_EVENT, i18next.t('point_cloud_process'))
        const scene = apiProvider.scene.scene as Scene;
        await setUpPointCloud(cloudPointFile as File, cloudPointFilters, scene)
        //eventBus.send(STOP_PROGRESS_EVENT, null)
    }

    if (cloudPointFile && cloudPointFile !== null) {
        initialize();
    }


    return (
        <PointCloudContainer/>
    )
}

export default PointCloud