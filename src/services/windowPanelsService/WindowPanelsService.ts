import WindowPanel from "./windowPanels/base/WindowPanel";

export interface WindowPanelsService{
    showWindowPanel(windowPanelType : Symbol) : WindowPanel
    closeWindowPanel(windowPanelType : Symbol) : void
    windowIsOpened(windowPanelType : Symbol) : boolean
}