import * as React from "react";
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Button, TextField} from "@material-ui/core";
import {
    closePointCloudFiltersPanel, pointCloudFiltersPanelActivitySelector,
    showPointCloudFiltersPanel
} from "../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import {ApplicationState, useAppDispatch} from "../../../../store/store";
import {createSelector, Selector} from "@reduxjs/toolkit";
import {
    changeXFromLimit,
    changeXToLimit,
    changeYFromLimit,
    changeYToLimit,
    changeZFromLimit,
    changeZToLimit,
    getPointCloudFiltersPanelSelector,
    PointCloudFiltersState
} from "../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {useSelector} from "react-redux";
import {isNumeric} from "rxjs/internal-compatibility";
import Typography from "@material-ui/core/Typography";
import {withTheme} from "styled-components";
import {AppTheme} from "../../theme/theme";
import PointCloudPanel from "./pointCloudPanel";

const dataSelector = createSelector([pointCloudFiltersPanelActivitySelector,
    getPointCloudFiltersPanelSelector], (isActive: boolean, filtersState: PointCloudFiltersState) =>
    ({
        isActive,
        filtersState
    })
);

const Panels: React.FC<{ theme: AppTheme }> = (props) => {
    const dispatch = useAppDispatch()
    const data = useSelector(dataSelector)
    const filter = data.filtersState

    return (
        <Panels>
            <PointCloudPanel/>
        </Panels>
    );
}

export default withTheme(Panels);