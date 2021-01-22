import React from "react";
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import PointCloudPanelFilters from "../../../shared/panels/PointCloudPanelFilters";
import { PanelMobileContainer } from "../../../shared/panels/style";

const PointCloudPanelMobile: React.FC<{ theme: Theme }> = (props) => {
    return (
        <PanelMobileContainer>
            <PointCloudPanelFilters/>
        </PanelMobileContainer>
    )
}

export default withTheme(PointCloudPanelMobile)