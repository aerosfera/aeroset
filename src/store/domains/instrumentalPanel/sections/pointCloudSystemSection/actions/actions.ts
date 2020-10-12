import {
    POINT_CLOUD_SYSTEM_SECTION_LOAD_FILE,
    PointCloudSystemSectionActionTypes
} from "../types/pointCloudSystemSectionState";

export default function pointCloudSystemLoadFile(file: File): PointCloudSystemSectionActionTypes {
    return {
        type: POINT_CLOUD_SYSTEM_SECTION_LOAD_FILE,
        payload: file
    }
}