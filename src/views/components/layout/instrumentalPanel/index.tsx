import React from "react";
import {withTheme} from "styled-components";
import PointCloudSection from "../sections/pointCloudSection";
import {Panel} from "./style";
import {Theme} from "@material-ui/core";

const InstrumentalPanel: React.FC<{ theme: Theme }> = (props) => {
    return (
        <Panel>
            <PointCloudSection/>
        </Panel>
    );
};

export default withTheme(InstrumentalPanel);