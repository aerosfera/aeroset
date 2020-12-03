import React from "react";
import {withTheme} from "styled-components";
import PointCloudSection from "../sections/pointCloud";
import {Panel} from "./style";
import {Theme} from "@material-ui/core";
import {AppDividerBold} from "../../shared/style";

const InstrumentalPanel: React.FC<{ theme: Theme }> = (props) => {
    return (
        <Panel>
            <PointCloudSection/>
            <AppDividerBold orientation="vertical"/>
        </Panel>
    );
};

export default withTheme(InstrumentalPanel);