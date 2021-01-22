import Scheme from "../../../../../models/scheme/Scheme";
import {Scene} from "@babylonjs/core/scene";
import {SchemeMode} from "../../../../types/SchemeMode";
import {constructScheme} from "./constructScheme";
import {GraphicData} from "../../../../types/DelayedInitialization";

export const loadSchemeFileToSceneAsync = async (scheme: Scheme, engineData: GraphicData, mode: SchemeMode): Promise<void> => {
    return constructScheme(scheme, engineData, mode)
}