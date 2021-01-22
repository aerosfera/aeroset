import React from "react";
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import PointCloudPanelFilters from "../../../shared/PointCloudPanelFilters";
import { PanelMobileContainer } from "../../../shared/style";

const PointCloudPanelMobile: React.FC<{ theme: Theme }> = (props) => {
    return (
        <PanelMobileContainer>
            <PointCloudPanelFilters/>
        </PanelMobileContainer>
    )
}

export default withTheme(PointCloudPanelMobile)