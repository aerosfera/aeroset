import {IWindowPanel} from "./IWindowPanel";

export default class WindowPanel implements IWindowPanel {
    close(): void {
    }

    getType(): Symbol {
        return Symbol.for("dfs");
    }

}