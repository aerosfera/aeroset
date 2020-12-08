import Scheme from "../../../../../models/scheme/Scheme";
import {Scene} from "@babylonjs/core/scene";
import {SchemeMode} from "../../../../types/SchemeMode";
import {constructTopologyScheme} from "./constructTopologyScheme";

export const loadSchemeFileToSceneAsync = async (scheme: Scheme, scene: Scene, mode: SchemeMode): Promise<void> => {
    switch (mode) {
        case SchemeMode.Topology:
            return constructTopologyScheme(scheme, scene)
            break;
        case SchemeMode.RibGeometry:
            break;
    }
}