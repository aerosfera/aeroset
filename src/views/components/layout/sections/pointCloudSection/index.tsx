import React, {Fragment} from "react";
import {useAppDispatch} from "../../../../../store/store";
import {
    pointCloudLoadFile,
    showPointCloudFiltersPanel
} from "../../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShift";
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const PointCloudSection: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    return (<div>
                <Fragment>
                    <input
                        color="primary"
                        type="file"
                        onChange={(e) => {
                            e.preventDefault();
                            const file: File = e.target.files?.[0] as File;
                            if (file && file !== undefined) {
                                dispatch(pointCloudLoadFile(file));
                            }
                        }}
                        id="icon-button-file"
                        style={{display: 'none',}}/>
                    <Tooltip title={t('load_file_with_point_cloud')} style={{marginLeft: 5}}>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                component="span"
                                size="small"
                                color="primary">
                                <CloudUploadIcon style={{color: "white"}}/>
                            </IconButton>
                        </label>
                    </Tooltip>
                </Fragment>
                <Tooltip title={t('open_panel_point_cloud_filters')}>
                    <IconButton size={"small"}
                                color={"primary"}
                                onClick={() =>
                                    dispatch(showPointCloudFiltersPanel())}
                                style={{verticalAlign: "bottom", marginLeft: 10}}>
                        <FilterTiltShiftIcon style={{color: "white"}}/>
                    </IconButton>
                </Tooltip>
            </div>
    );
};

export default withTheme(PointCloudSection);