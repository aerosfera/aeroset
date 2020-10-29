import React, {Fragment} from "react";
import {AppTheme} from "../../../theme/theme";
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

const PointCloudSection: React.FC<{ theme: AppTheme }> = (props) => {
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
                    <Tooltip title="Загрузить файл с облаком точек" style={{marginLeft: 5}}>
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
                <Tooltip title="Открыть панель с фильтрами облака точек">
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