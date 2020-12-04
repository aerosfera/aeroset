import Node from './Node'
import SchemeInfo from "./SchemeInfo";

export default interface Scheme extends SchemeInfo {
    nodes: Node[]
}