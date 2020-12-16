import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import {Scene} from '@babylonjs/core/scene';
import {useSelector} from "react-redux";
import {schemeFileLoadSelector} from "../../../../store/ui/sections/scheme/schemeSection";
import {parseSchemeFileAsync} from "./code/parseSchemeFileAsync";
import Scheme from "../../../../models/scheme/Scheme";
import {loadSchemeFileToSceneAsync} from "./code/loadSchemeToSceneAsync";
import {SchemeMode} from "../../../types/SchemeMode";
import {DelayedInitialization, GuiEngineData} from "../../../types/DelayedInitialization";

const AppScheme = forwardRef((props, ref: Ref<DelayedInitialization>) => {

    useImperativeHandle(ref, () => ({initialize}));
    const data: File | null = useSelector(schemeFileLoadSelector)
    const [state, setState] = useState<{ engineData: GuiEngineData | null }>({engineData: null})
    const {engineData} = state

    const initialize = async (engineData: GuiEngineData) => {
        setState({engineData})
    }

    const loadScheme = async () => {
        const scheme: Scheme = await parseSchemeFileAsync(data as File)
        await loadSchemeFileToSceneAsync(scheme, engineData as GuiEngineData, SchemeMode.Topology)
    }

    if (data && engineData) {
        loadScheme()
    }

    return (
        <div>
            {/*empty*/}
        </div>
    )
})

export default AppScheme;
