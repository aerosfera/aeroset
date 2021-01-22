import React from "react";
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import SchemeSettings from "../../../shared/SetupSchemeMode";
import { PanelMobileContainer } from "../../../shared/style";

const SchemePanelMobile: React.FC<{ theme: Theme }> = (props) => {
    return (
        <PanelMobileContainer>
            <SchemeSettings/>
        </PanelMobileContainer>
    )
}

export default withTheme(SchemePanelMobile)