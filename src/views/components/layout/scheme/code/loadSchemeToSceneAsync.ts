import Scheme from "../../../../../models/scheme/Scheme";
import {Scene} from "@babylonjs/core/scene";
import {SchemeMode} from "../../../../types/SchemeMode";
import {constructTopologyScheme} from "./constructTopologyScheme";
import {GuiEngineData} from "../../../../types/DelayedInitialization";

export const loadSchemeFileToSceneAsync = async (scheme: Scheme, engineData: GuiEngineData, mode: SchemeMode): Promise<void> => {
    return constructTopologyScheme(scheme, engineData, mode)
}