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
import {closeSchemePanel, schemePanelActivitySelector} from "../../../../../store/ui/panels/scheme/schemePanel";
import SetupSchemeMode from "../../shared/panels/SetupSchemeMode";
import SetupCameraMode from "../../shared/panels/SetupCameraMode";
import GreenCheckbox from "../../shared/panels/SetupAxis";
import {Scene} from "@babylonjs/core/scene";

const SchemePanel: React.FC<{ theme: Theme, scene: Scene }> = (props) => {
    const {scene} = props
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const isActive = useSelector(schemePanelActivitySelector)

    return (
        <Draggable bounds="parent" handle="strong" defaultPosition={{x: 16, y: 16}} grid={[25,25]}>
            <PanelContainer isActive={isActive} width={257} height={240}>
                <section>
                    <PanelHeaderContainer>
                        <PanelHeader>
                            <PanelHeaderText>
                                <PanelHeaderTypography
                                    variant="subtitle1">{t('scheme_settings')}</PanelHeaderTypography>
                            </PanelHeaderText>
                            <Tooltip title={t('close')}
                                     style={{
                                         float: "right"
                                     }}>
                                <label>
                                    <IconButton
                                        component="span"
                                        size="small"
                                        onClick={() => dispatch(closeSchemePanel())}
                                        color="primary">
                                        <AppCloseIcon/>
                                    </IconButton>
                                </label>
                            </Tooltip>
                        </PanelHeader>
                    </PanelHeaderContainer>
                    <SetupSchemeMode/>
                    <SetupCameraMode/>
                    <GreenCheckbox scene={scene}/>
                </section>
            </PanelContainer>
        </Draggable>
    )
}

export default withTheme(SchemePanel)