import {SectionState} from "../../../types/SectionState";

export interface PointCloudSystemSectionState extends SectionState {
    pointsCloudFile: File | null;
}

export const POINT_CLOUD_SYSTEM_SECTION_LOAD_FILE = 'POINT_CLOUD_SYSTEM_SECTION_LOAD_FILE';

interface PointCloudSystemSectionLoadFileAction {
    type: typeof POINT_CLOUD_SYSTEM_SECTION_LOAD_FILE,
    payload: File
}

export type PointCloudSystemSectionActionTypes = PointCloudSystemSectionLoadFileAction;