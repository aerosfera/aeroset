import React from "react";
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import PointCloudPanelFilters from "../shared";
import {PointCloudPanelMobileContainer} from "./style";

const PointCloudPanelMobile: React.FC<{ theme: Theme }> = (props) => {
    return (
        <PointCloudPanelMobileContainer>
            <PointCloudPanelFilters/>
        </PointCloudPanelMobileContainer>
    )
}

export default withTheme(PointCloudPanelMobile)