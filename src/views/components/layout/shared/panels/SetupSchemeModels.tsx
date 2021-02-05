import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {store, useAppDispatch} from "../../../../../store/store";
import {useTranslation} from "react-i18next";
import {FormControlStyled, SelectStyled} from "./style";
import {FormHelperText, MenuItem} from "@material-ui/core";
import {withTheme} from "styled-components";
import {SchemeModel} from "../../../../types/SchemeModel";
import {setActiveModelId} from "../../../../../store/domain/scheme/activeSchemeReducer";
import {useSelector} from "react-redux";
import {schemeActiveModelSelector, setActiveModel} from "../../../../../store/ui/panels/models/schemeModelsPanel";
import {pressureModelsAll} from "../../../../../store/entity/models/pressure/pressureModelsReducer";
import _ from 'lodash';

const SetupSchemeModels: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    const activeModel = useSelector(schemeActiveModelSelector);

    const handleChange = (event: React.ChangeEvent<{ value: SchemeModel }>) => {
        const value = event.target.value;

        switch (value) {
            case SchemeModel.Pressure:
                const pressureModelsState = store.getState().entity.models.pressure;
                const allRPressureModels = pressureModelsAll(pressureModelsState);
                const lastModel = _.last(allRPressureModels);
                if (lastModel)
                    dispatch(setActiveModelId(lastModel));
                break;
            case SchemeModel.Air:
                dispatch(setActiveModelId(null));
                break;
            case SchemeModel.None:
                dispatch(setActiveModelId(null));
                break;
        }

        dispatch(setActiveModel(value));
    };

    return (
        <React.Fragment>
            <FormControlStyled>
                <SelectStyled
                    value={activeModel}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}>
                    <MenuItem value={SchemeModel.None}>{t('none')}</MenuItem>
                    <MenuItem value={SchemeModel.Pressure}>{t('pressure')}</MenuItem>
                    <MenuItem value={SchemeModel.Air}>{t('models_air')}</MenuItem>
                </SelectStyled>
                <FormHelperText>{t('model')}</FormHelperText>
            </FormControlStyled>

        </React.Fragment>
    );
}

export default withTheme(SetupSchemeModels);