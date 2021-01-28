import React, {useEffect} from "react";
import withTheme from "@material-ui/core/styles/withTheme";
import {Theme} from "@material-ui/core";
import {Scene} from "@babylonjs/core/scene";
import {useSelector} from "react-redux";
import {schemeChangedSelector} from "../../../../../store/entities/scheme/schemeReducer";

const AppSchemeCurrent: React.FC<{ theme: Theme, scene: Scene}> = (props) => {
    const {scene} = props;
    const currentScheme = useSelector(schemeChangedSelector);

    useEffect(() => {
        return () => {
            if (currentScheme && currentScheme.ui) {
                for (const mesh of currentScheme.ui) {
                    mesh.dispose()
                }
            }
        }
    }, [currentScheme])

    return (
        <React.Fragment/>
    )
}

export default withTheme(AppSchemeCurrent);