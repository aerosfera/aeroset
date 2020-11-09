import * as React from "react";
import {Theme} from "@material-ui/core";
import {withTheme} from "styled-components";
import PointCloudPanelFilters from "../shared";

const PointCloudPanelMobile: React.FC<{ theme: Theme }> = (props) => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <PointCloudPanelFilters/>
        </div>
    )
}

export default withTheme(PointCloudPanelMobile)