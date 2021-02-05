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
import {AppCloseIcon} from "../../../shared/icons";
import {Scene} from "@babylonjs/core/scene";
import {
    closeSchemeModelsPanel,
    schemeModelsPanelActivitySelector
} from "../../../../../store/ui/panels/models/schemeModelsPanel";
import SetupSchemeModels from "../../shared/panels/SetupSchemeModels";
import SetupGradient from "../../shared/panels/SetupGradient";
import ColorGradientView from "../../shared/panels/ColorGradientView";

const SchemeModelsPanel: React.FC<{ theme: Theme, scene: Scene }> = (props) => {
    const {scene} = props
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const isActive = useSelector(schemeModelsPanelActivitySelector);

    const onClose = () => dispatch(closeSchemeModelsPanel());
    return (
        <Draggable bounds="parent" handle="strong" defaultPosition={{x: 16, y: 16}} grid={[25, 25]}>
            <PanelContainer isActive={isActive} width={257} height={340}>
                <div>
                    <PanelHeaderContainer>
                        <PanelHeader>
                            <PanelHeaderText>
                                <PanelHeaderTypography
                                    variant="subtitle1">{t('scheme_models')}</PanelHeaderTypography>
                            </PanelHeaderText>
                            <Tooltip title={t('close')}
                                     style={{
                                         float: "right"
                                     }}>
                                <label>
                                    <IconButton
                                        component="span"
                                        size="small"
                                        onClick={onClose}
                                        color="primary">
                                        <AppCloseIcon/>
                                    </IconButton>
                                </label>
                            </Tooltip>
                        </PanelHeader>
                    </PanelHeaderContainer>
                    <SetupSchemeModels/>
                    <SetupGradient/>
                    <ColorGradientView/>
                </div>
            </PanelContainer>
        </Draggable>
    )
}

export default withTheme(SchemeModelsPanel)