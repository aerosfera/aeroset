import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useAppDispatch} from "../../../../../store/store";
import {useTranslation} from "react-i18next";
import {Slider} from "@material-ui/core";
import {withTheme} from "styled-components";
import {
    activeScaleFactorChangedSelector,
    setActiveScaleFactor
} from "../../../../../store/domain/scheme/activeSchemeReducer";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";

const SetupScaleFactor: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const scaleFactor = useSelector(activeScaleFactorChangedSelector);

    const marks = [
        {
            value: 0.1,
            label: '0.1',
        },
        {
            value: 0.5,
            label: '0.5',
        },
        {
            value: 1,
            label: '1',
        },
        {
            value: 1.5,
            label: '1.5',
        },
        {
            value: 2,
            label: '2',
        }
    ];

    const xScale = scaleFactor.x;
    const yScale = scaleFactor.y;
    const zScale = scaleFactor.z;

    const scaleXOnChangeHandler = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        const xValue = value as Number;
        dispatch(setActiveScaleFactor({x: xValue, y: yScale, z: zScale}));
    }

    const scaleYOnChangeHandler = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        const yValue = value as Number;
        dispatch(setActiveScaleFactor({x: xScale, y: yValue, z: zScale}));
    }

    const scaleZOnChangeHandler = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        const zValue = value as Number;
        dispatch(setActiveScaleFactor({x: xScale, y: yScale, z: zValue}));
    }

    const minValue = 0.1;
    const maxValue = 2;
    const step = 0.1;

    return (
        <div style={{margin: 24}}>
            <Typography id="discrete-slider-always" gutterBottom>
                {t('scale_scheme_by_x')}
            </Typography>
            <Slider
                id='xScale'
                defaultValue={xScale}
                onChangeCommitted={scaleXOnChangeHandler}
                aria-labelledby="discrete-slider-always"
                step={step}
                marks={marks}
                valueLabelDisplay="on"
                min={minValue}
                max={maxValue}
            />

            <Typography id="discrete-slider-always" gutterBottom style={{marginTop: 8}}>
                {t('scale_scheme_by_y')}
            </Typography>
            <Slider
                id='yScale'
                defaultValue={yScale}
                onChangeCommitted={scaleYOnChangeHandler}
                aria-labelledby="discrete-slider-always"
                step={step}
                marks={marks}
                valueLabelDisplay="on"
                min={minValue}
                max={maxValue}
            />
            <Typography id="discrete-slider-always" gutterBottom style={{marginTop: 8}}>
                {t('scale_scheme_by_z')}
            </Typography>
            <Slider
                id='zScale'
                defaultValue={zScale}
                onChangeCommitted={scaleZOnChangeHandler}
                aria-labelledby="discrete-slider-always"
                step={step}
                marks={marks}
                valueLabelDisplay="on"
                min={minValue}
                max={maxValue}
            />
        </div>
    );
}

export default withTheme(SetupScaleFactor);