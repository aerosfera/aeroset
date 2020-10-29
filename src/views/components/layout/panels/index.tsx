import * as React from "react";
import {withTheme} from "styled-components";
import {AppTheme} from "../../theme/theme";
import PointCloudPanel from "./pointCloudPanel";

const Panels: React.FC<{ theme: AppTheme }> = (props) => {
    return (
        <Panels>
            <PointCloudPanel/>
        </Panels>
    );
}

export default withTheme(Panels);