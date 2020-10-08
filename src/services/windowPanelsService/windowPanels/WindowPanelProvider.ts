import {WindowPanelsService} from "../WindowPanelsService";
import WindowPanel from "./base/WindowPanel";
import PointCloudFiltersWindow from "./PointCloudFiltersWindow";
import WindowPanelTypes from "../WindowPanelTypes";
import { injectable } from "inversify";

@injectable()
export default class WindowPanelsProvider implements WindowPanelsService{
    showWindowPanel(windowPanelType: Symbol): WindowPanel {
        switch (windowPanelType){
            case WindowPanelTypes.PointCloudFiltersWindow :
                return new PointCloudFiltersWindow();
                break;
            default:
                throw new Error("Unknown panelWindow type")
        }
    }

    closeWindowPanel(windowPanelType: Symbol): void {
    }

    windowIsOpened(windowPanelType: Symbol): boolean {
        return false;
    }

}