import {SectionState} from "../../../types/SectionState";

export interface PointCloudSystemSectionState extends SectionState {
    pointsCloudFile: File | null;
}