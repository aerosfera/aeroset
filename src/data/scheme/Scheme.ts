import Node from '../base/Node'
import SchemeInfo from "./SchemeInfo";

export default interface Scheme extends SchemeInfo {
    nodes: Node[]
}