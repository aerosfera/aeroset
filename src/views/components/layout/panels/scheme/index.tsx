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
} from "../../shared/style";
import {AppCloseIcon} from "../../../shared/icons";
import {closeSchemePanel, schemePanelActivitySelector} from "../../../../../store/ui/panels/scheme/schemePanel";
import SetupSchemeMode from "../../shared/SetupSchemeMode";
import SetupCameraMode from "../../shared/SetupCameraMode";

const SchemePanel: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const isActive = useSelector(schemePanelActivitySelector)

    return (
        <Draggable bounds="parent" handle="strong" defaultPosition={{x: 16, y: 16}}>
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
                </section>
            </PanelContainer>
        </Draggable>
    )
}

export default withTheme(SchemePanel)