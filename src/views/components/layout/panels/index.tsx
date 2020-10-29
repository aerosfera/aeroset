import * as React from "react";
import {withTheme} from "styled-components";
import PointCloudPanel from "./pointCloudPanel";
import {Theme} from "@material-ui/core";

const Panels: React.FC<{ theme: Theme }> = (props) => {
    return (
        <Panels>
            <PointCloudPanel/>
        </Panels>
    );
}

export default withTheme(Panels);