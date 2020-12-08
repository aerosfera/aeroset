import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import {Scene} from '@babylonjs/core/scene';
import {useSelector} from "react-redux";
import {schemeFileLoadSelector} from "../../../../store/ui/sections/scheme/schemeSection";
import {parseSchemeFileAsync} from "./code/parseSchemeFileAsync";
import Scheme from "../../../../models/scheme/Scheme";
import {loadSchemeFileToSceneAsync} from "./code/loadSchemeToSceneAsync";
import {SchemeMode} from "../../../types/SchemeMode";
import {RefSceneObject} from "../scene";

const AppScheme = forwardRef((props, ref: Ref<RefSceneObject>) => {
    useImperativeHandle(ref, () => ({initialize}));
    const data: File | null = useSelector(schemeFileLoadSelector)
    const [state, setState] = useState<{ scene: Scene | null }>({scene: null})
    const {scene} = state

    const initialize = async (scene: Scene) => {
        setState({scene: scene})
    }

    const loadScheme = async () => {
        const scheme: Scheme = await parseSchemeFileAsync(data as File)
        await loadSchemeFileToSceneAsync(scheme, scene as Scene, SchemeMode.Topology)
    }

    if (data && scene) {
        loadScheme()
    }

    return (
        <div>
            {/*empty*/}
        </div>
    )
})

export default AppScheme;
