import {Point} from "./Point";

export default interface Node {
    id: string,
    point: Point,
    linkedNodes: string[]
    lifetime : Date,
    type : number
}