import {withTheme} from "styled-components";
import * as React from "react";
import {useAppDispatch} from "../../../../../store/store";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Checkbox, withStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {green} from "@material-ui/core/colors";
import {FormControlLabelStyled} from "./style";
import {setTargetAxisVisibility, targetAxisVisibilitySelector} from "../../../../../store/entities/scene/sceneReducer";
import showAxisOnTargetVector from "../../scene/code/setupAxis";
import {cameraTargetSelector} from "../../../../../store/entities/camera/cameraReducer";
import {Scene} from "@babylonjs/core/scene";
import {AbstractMesh} from "@babylonjs/core";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

let axisMeshes: AbstractMesh[] | null = null

const SetupAxis: React.FC<{ theme: Theme, scene: Scene }> = (props) => {
    const {scene} = props
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const isVisible = useSelector(targetAxisVisibilitySelector)
    const cameraTarget = useSelector(cameraTargetSelector)

    // @ts-ignore
    const handleChange = (event) => {
        dispatch(setTargetAxisVisibility(event.target.checked))
    };

    if (isVisible && scene && cameraTarget) {
        axisMeshes = showAxisOnTargetVector(scene, 2, cameraTarget);
    } else {
        if (!isVisible && scene && axisMeshes) {
            axisMeshes.map(m => m.dispose())
        }
    }

    return (
        <React.Fragment>
            <FormControlLabelStyled
                control={
                    <GreenCheckbox checked={isVisible} onChange={handleChange}/>
                }
                label={t('showAxisOnCameraTarget')}
            />
        </React.Fragment>
    )

}

export default withTheme(SetupAxis)