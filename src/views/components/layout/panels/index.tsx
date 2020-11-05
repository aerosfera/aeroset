import * as React from "react";
import {withTheme} from "styled-components";
import PointCloudPanel from "./pointCloudPanel";
import {Theme} from "@material-ui/core";
import {PanelsContainer} from "./style";

const Panels: React.FC<{ theme: Theme }> = (props) => {
    return (
        <PanelsContainer>
            <PointCloudPanel/>
        </PanelsContainer>
    );
}

export default withTheme(Panels);