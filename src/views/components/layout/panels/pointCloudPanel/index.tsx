import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Draggable from 'react-draggable';
import {
    closePointCloudFiltersPanel,
    pointCloudFiltersPanelActivitySelector
} from "../../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import {Theme} from "@material-ui/core";
import * as React from "react";
import {useAppDispatch} from "../../../../../store/store";
import {useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import {withTheme} from "styled-components";
import {useTranslation} from "react-i18next";
import {
    PanelContainer,
    PanelHeaderContainer,
    PanelHeader,
    PanelHeaderText,
    PanelHeaderTypography
} from "../shared/style";
import {AppCloseIcon} from "../../../shared/style";
import PointCloudPanelFilters from "./shared";

const dataSelector = createSelector([pointCloudFiltersPanelActivitySelector], (isActive: boolean) =>
    ({
        isActive : isActive
    })
);

const PointCloudPanel: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const data = useSelector(dataSelector)

    return (
        <Draggable bounds="parent" handle="strong">
            <PanelContainer isActive={data.isActive} width={257} height={240}>
                <section>
                    <PanelHeaderContainer>
                        <PanelHeader>
                            <PanelHeaderText>
                                <PanelHeaderTypography variant="subtitle1">{t('point_cloud_filters')}</PanelHeaderTypography>
                            </PanelHeaderText>
                            <Tooltip title={t('close')}
                                     style={{
                                         float: "right"
                                     }}>
                                <label>
                                    <IconButton
                                        component="span"
                                        size="small"
                                        onClick={() => dispatch(closePointCloudFiltersPanel())}
                                        color="primary">
                                        <AppCloseIcon/>
                                    </IconButton>
                                </label>
                            </Tooltip>
                        </PanelHeader>
                    </PanelHeaderContainer>
                    <PointCloudPanelFilters/>
                </section>
            </PanelContainer>
        </Draggable>
    )
}

export default withTheme(PointCloudPanel)