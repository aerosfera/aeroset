import {SchemeUI} from "../../data/ui/SchemeUI";
import {Vector3D} from "../../data/base/Vector3D";
import {Mesh, Vector3} from "@babylonjs/core";

export const scaleScheme = (schemeUI: SchemeUI, scaleFactor: Vector3D, schemeCenter: Vector3D) : SchemeUI => {
    const xScale = scaleFactor.x;
    const yScale = scaleFactor.y;
    const zScale = scaleFactor.z;

    for (const rib of schemeUI.ribs) {
        const ribMesh = rib.mesh;
        const node1Point = rib.node1Point;
        const node2Point = rib.node2Point;

        let sx = 1;
        let sy = 1;
        let sz = 1;

        if (ribMesh.metadata && ribMesh.metadata.scale) {
            sx = ribMesh.metadata.scale.sx;
            sy = ribMesh.metadata.scale.sy;
            sz = ribMesh.metadata.scale.sz;
        }

        const _sx = xScale / sx;
        const _sy = yScale / sy;
        const _sz = zScale / sz;

        const pivotPoint = schemeCenter;

        const node1scaledPoint= new Vector3(pivotPoint.x + _sx * (node1Point.x - pivotPoint.x),
            pivotPoint.y + _sy * (node1Point.y - pivotPoint.y),
            pivotPoint.z + _sz * (node1Point.z - pivotPoint.z));

        const node2scaledPoint= new Vector3(pivotPoint.x + _sx * (node2Point.x - pivotPoint.x),
            pivotPoint.y + _sy * (node2Point.y - pivotPoint.y),
            pivotPoint.z + _sz * (node2Point.z - pivotPoint.z));

        ribMesh.unfreezeNormals();

        // @ts-ignore
        const updatedTube = Mesh.CreateTube(null,
            [node1scaledPoint, node2scaledPoint],
            0.02,
            null,
            null,
            null,
            null,
            true,
            null,
            ribMesh);

        // rib.node1Point = node1scaledPoint;
        // rib.node2Point = node2scaledPoint;
        // rib.mesh = updatedTube;

        rib.mesh.freezeNormals();

        const scale = {
            sx: sx,
            sy: sy,
            sz: sz,
        };
        if(ribMesh.metadata){
            ribMesh.metadata.scale = scale
        }
        else {
            ribMesh.metadata = {
                scale: scale
            }
        }

        rib.mesh.computeWorldMatrix();
    }

    for (const node of schemeUI.nodes) {
        const nodeMesh = node.mesh;

        let sx = 1;
        let sy = 1;
        let sz = 1;

        if (nodeMesh.metadata && nodeMesh.metadata.scale) {
            sx = nodeMesh.metadata.scale.sx;
            sy = nodeMesh.metadata.scale.sy;
            sz = nodeMesh.metadata.scale.sz;
        }

        const _sx = xScale / sx;
        const _sy = yScale / sy;
        const _sz = zScale / sz;

        const pivotPoint = schemeCenter;

        nodeMesh.position = new Vector3(pivotPoint.x + _sx * (nodeMesh.position.x - pivotPoint.x),
            pivotPoint.y + _sy * (nodeMesh.position.y - pivotPoint.y),
            pivotPoint.z + _sz * (nodeMesh.position.z - pivotPoint.z));

        const scale = {
            sx: sx,
            sy: sy,
            sz: sz,
        };
        if(nodeMesh.metadata){
            nodeMesh.metadata.scale = scale
        }
        else {
            nodeMesh.metadata = {
                scale: scale
            }
        }

        nodeMesh.computeWorldMatrix();
    }
}