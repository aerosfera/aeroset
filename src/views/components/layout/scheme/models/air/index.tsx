import React from "react";
import withTheme from "@material-ui/core/styles/withTheme";
import {Theme} from "@material-ui/core";
import {useSelector} from "react-redux";
import {
    activeModelsChangedSelector,
    activeSchemeUiChangedSelector
} from "../../../../../../store/domain/scheme/activeSchemeReducer";
import Scheme from "../../../../../../data/scheme/Scheme";

const AirModel: React.FC<{ theme: Theme, scheme : Scheme }> = (props) => {
    const {scheme} = props;

    const airModels = useSelector(activeModelsChangedSelector);
    const schemeUi = useSelector(activeSchemeUiChangedSelector);

    return (
        <React.Fragment/>
    )
}

export default withTheme(AirModel);