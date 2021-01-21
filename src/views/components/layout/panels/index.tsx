import * as React from "react";
import {withTheme} from "styled-components";
import PointCloudPanel from "./pointCloudPanel";
import {Theme} from "@material-ui/core";
import {PanelsContainer} from "./style";
import SchemePanel from "./scheme";

const Panels: React.FC<{ theme: Theme }> = (_) => {
    return (
        <PanelsContainer>
            <PointCloudPanel/>
            <SchemePanel/>
        </PanelsContainer>
    );
}

export default withTheme(Panels);