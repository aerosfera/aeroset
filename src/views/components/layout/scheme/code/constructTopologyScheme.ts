import Scheme from "../../../../../models/scheme/Scheme";
import {Scene} from "@babylonjs/core/scene";
import {Vector3} from "@babylonjs/core";

export const constructTopologyScheme = async (scheme: Scheme, scene: Scene): Promise<void> => {
    for (const node of scheme.nodes) {
        const point = node.point;
        const nodeVector = new Vector3(point.x, point.y, point.z)
    }

}