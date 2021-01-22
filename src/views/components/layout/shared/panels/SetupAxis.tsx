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

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


const SetupAxis: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const isVisible = useSelector(targetAxisVisibilitySelector)

    // @ts-ignore
    const handleChange = (event) => {
        dispatch(setTargetAxisVisibility(event.target.checked))
    };

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