import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Draggable from 'react-draggable';
import {Theme} from "@material-ui/core";
import * as React from "react";
import {useAppDispatch} from "../../../../../store/store";
import {useSelector} from "react-redux";
import {withTheme} from "styled-components";
import {useTranslation} from "react-i18next";
import {
    PanelContainer,
    PanelHeaderContainer,
    PanelHeader,
    PanelHeaderText,
    PanelHeaderTypography
} from "../../shared/panels/style";
import PointCloudPanelFilters from "../../shared/panels/PointCloudPanelFilters";
import {AppCloseIcon} from "../../../shared/icons";
import {
    closePointCloudPanel,
    pointCloudPanelActivitySelector
} from "../../../../../store/ui/panels/pointCloud/pointCloudPanel";

const PointCloudPanel: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const isActive = useSelector(pointCloudPanelActivitySelector)

    return (
        <Draggable bounds="parent" handle="strong" defaultPosition={{x: 16, y: 16}} grid={[25,25]}>
            <PanelContainer isActive={isActive} width={257} height={240}>
                <section>
                    <PanelHeaderContainer>
                        <PanelHeader>
                            <PanelHeaderText>
                                <PanelHeaderTypography
                                    variant="subtitle1">{t('point_cloud_filters')}</PanelHeaderTypography>
                            </PanelHeaderText>
                            <Tooltip title={t('close')}
                                     style={{
                                         float: "right"
                                     }}>
                                <label>
                                    <IconButton
                                        component="span"
                                        size="small"
                                        onClick={() => dispatch(closePointCloudPanel())}
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