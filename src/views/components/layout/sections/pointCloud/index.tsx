import React, {Fragment} from "react";
import {useAppDispatch} from "../../../../../store/store";
import {
    pointCloudLoadFile
} from "../../../../../store/ui/sections/pointCloud/pointCloudSection";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {AppClearPointCloudIcon, AppOpenPointCloudFiltersIcon, AppPublishIcon} from "../../../shared/icons";
import { showPointCloudPanel } from "../../../../../store/ui/panels/pointCloud/pointCloudPanel";

const PointCloudSection: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();

    const fileLoad = (e) => {
        e.preventDefault();
        const file: File = e.target.files?.[0] as File;
        if (file && file !== undefined) {
            dispatch(pointCloudLoadFile(file));
        }
        e.preventDefault()
    };

    const showPanel = () =>
        dispatch(showPointCloudPanel());

    return (
        <div>
            <Fragment>
                <input
                    color="primary"
                    type="file"
                    onChange={fileLoad}
                    id="icon-button-file"
                    style={{display: 'none',}}/>
                <Tooltip title={t('load_file_with_point_cloud')}>
                    <label htmlFor="icon-button-file">
                        <IconButton
                            component="span"
                            size="small"
                            color="primary">
                            <AppPublishIcon/>
                        </IconButton>
                    </label>
                </Tooltip>
            </Fragment>
            <Tooltip title={t('open_panel_point_cloud_filters')}>
                <IconButton size={"small"}
                            color={"primary"}
                            onClick={showPanel}
                            style={{verticalAlign: "bottom", marginLeft: 8}}>
                    <AppOpenPointCloudFiltersIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={t('point_cloud_clear')}>
                <IconButton size={"small"}
                            color={"primary"}
                            onClick={() => null}
                            style={{verticalAlign: "bottom", marginLeft: 8}}>
                    <AppClearPointCloudIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default withTheme(PointCloudSection);
