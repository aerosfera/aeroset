import React from "react";
import {withTheme} from "styled-components";
import {AppTheme} from "../../theme/theme";
import PointCloudSection from "../sections/pointCloudSection";
import {Panel} from "./style";

const InstrumentalPanel: React.FC<{ theme: AppTheme }> = (props) => {
    return (
        <Panel>
            <PointCloudSection/>
        </Panel>
    );
};

export default withTheme(InstrumentalPanel);