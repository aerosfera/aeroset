import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Draggable from 'react-draggable';
import {
    closePointCloudFiltersPanel,
    pointCloudFiltersPanelActivitySelector
} from "../../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import {TextField, Theme} from "@material-ui/core";
import {isNumeric} from "rxjs/internal-compatibility";
import {
    changeXFromLimit,
    changeXToLimit,
    changeYFromLimit,
    changeYToLimit,
    changeZFromLimit,
    changeZToLimit,
    getPointCloudFiltersPanelSelector, PointCloudFiltersState
} from "../../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
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
    PanelHeaderTypography, PanelBodyContainer
} from "../shared/style";
import {AppCloseIcon} from "../../../shared/style";
import {PointCloudPanelLineContainer} from "./style";

const dataSelector = createSelector([pointCloudFiltersPanelActivitySelector,
    getPointCloudFiltersPanelSelector], (isActive: boolean, filtersState: PointCloudFiltersState) =>
    ({
        isActive,
        filtersState
    })
);

const PointCloudPanel: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const data = useSelector(dataSelector)
    const filter = data.filtersState

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
                    <PanelBodyContainer>
                        <PointCloudPanelLineContainer>
                            <TextField
                                label={t('point_cloud_x_from')}
                                type="number"
                                name={"x-from"}
                                step="0.1"
                                value={filter.filterXFromLimit}
                                onChange={event => {
                                    const value = event.target.value;
                                    if (isNumeric(value))
                                        dispatch(changeXFromLimit(value))
                                }}
                                style={{width: 100, height: 20}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="standard"
                            />
                            <TextField
                                id="outlined-number"
                                label={t('point_cloud_x_to')}
                                type="number"
                                name={"x-to"}
                                step="0.1"
                                value={filter.filterXToLimit}
                                onChange={event => dispatch(changeXToLimit(event.target.value))}
                                style={{width: 100, marginLeft: 24}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="standard"/>
                        </PointCloudPanelLineContainer>
                        <PointCloudPanelLineContainer>
                            <TextField
                                id="outlined-number"
                                label={t('point_cloud_y_from')}
                                type="number"
                                name={"y-from"}
                                step="0.1"
                                value={filter.filterYFromLimit}
                                onChange={event => dispatch(changeYFromLimit(event.target.value))}
                                style={{width: 100, height: 20}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="standard"
                            />
                            <TextField
                                id="outlined-number"
                                label={t('point_cloud_y_to')}
                                type="number"
                                name={"y-to"}
                                step="0.1"
                                value={filter.filterYToLimit}
                                onChange={event => dispatch(changeYToLimit(event.target.value))}
                                style={{width: 100, marginLeft: 24}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="standard"/>
                        </PointCloudPanelLineContainer>
                        <PointCloudPanelLineContainer>
                            <TextField
                                id="outlined-number"
                                label={t('point_cloud_z_from')}
                                type="number"
                                name={"z-from"}
                                step="0.1"
                                value={filter.filterZFromLimit}
                                onChange={event => dispatch(changeZFromLimit(event.target.value))}
                                style={{width: 100, height: 20}}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="standard"
                            />
                            <TextField
                                id="outlined-number"
                                label={t('point_cloud_z_to')}
                                type="number"
                                name={"z-to"}
                                step="0.1"
                                value={filter.filterZToLimit}
                                onChange={event => dispatch(changeZToLimit(event.target.value))}
                                style={{width: 100, marginLeft: 24}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="standard"/>
                        </PointCloudPanelLineContainer>
                    </PanelBodyContainer>
                </section>
            </PanelContainer>
        </Draggable>
    )
}

export default withTheme(PointCloudPanel)