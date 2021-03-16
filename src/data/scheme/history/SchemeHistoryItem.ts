import Node from "../../base/Node";
import Meta from "../../base/Meta";
import SchemeMeta from "../SchemeMeta";
import {HistoryType} from "./HistoryType";
import SchemeModel from "./SchemeModel";
import SchemeExport from "./SchemeExport";

export default interface SchemeHistoryItem extends Meta, SchemeMeta {
    isActive: boolean
    nodes: Node[]
    createdAt: Date
    authorId: string
    type: HistoryType
    data: SchemeModel | SchemeExport | null
}