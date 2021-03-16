import React from "react";
import {withTheme} from "styled-components";
import PointCloudSection from "../sections/pointCloud";
import {Panel} from "./style";
import {Theme} from "@material-ui/core";
import {AppDividerBold} from "../../shared/style";
import SchemeSection from "../sections/scheme";
import ModelsSection from "../sections/models";
import {useSelector} from "react-redux";
import {activeSchemeModeChangedSelector} from "../../../../store/domain/scheme/activeSchemeReducer";
import {SchemeMode} from "../../../../data/scheme/SchemeMode";

const InstrumentalPanel: React.FC<{ theme: Theme }> = (props) => {
    const schemeMode = useSelector(activeSchemeModeChangedSelector);

    const modelSectionIsActive = schemeMode == SchemeMode.RibGeometry;

    return (
        <Panel>
            <PointCloudSection/>
            <AppDividerBold orientation="vertical"/>
            <SchemeSection/>
            <AppDividerBold orientation="vertical"/>
            {
                modelSectionIsActive ?
                    (<ModelsSection/>) : (React.Fragment)
            }
            {
                modelSectionIsActive ?
                    (<AppDividerBold orientation="vertical"/>) : (React.Fragment)
            }

        </Panel>
    );
};

export default withTheme(InstrumentalPanel);