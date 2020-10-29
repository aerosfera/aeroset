import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Draggable from 'react-draggable';
import {
    closePointCloudFiltersPanel,
    pointCloudFiltersPanelActivitySelector
} from "../../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import CloseIcon from "@material-ui/icons/Close";
import {TextField, Theme} from "@material-ui/core";
import {isNumeric} from "rxjs/internal-compatibility";
import {
    changeXFromLimit,
    changeXToLimit,
    changeYFromLimit,
    changeYToLimit,
    changeZFromLimit,
    changeZToLimit,
    getPointCloudFiltersPanelSelector, PointCloudFiltersState
} from "../../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import * as React from "react";
import {useAppDispatch} from "../../../../../store/store";
import {useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import {withTheme} from "styled-components";

const dataSelector = createSelector([pointCloudFiltersPanelActivitySelector,
    getPointCloudFiltersPanelSelector], (isActive: boolean, filtersState: PointCloudFiltersState) =>
    ({
        isActive,
        filtersState
    })
);

const PointCloudPanel: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch()
    const data = useSelector(dataSelector)
    const filter = data.filtersState

    return (
        <Draggable bounds="parent" handle="strong">
            <div style={
                {
                    height: 255,
                    width: 250,
                    background: "#e8e8e8",
                    borderRadius: 5,
                    pointerEvents: "auto",
                    visibility: data.isActive ? "visible" : "hidden"
                }}>

                <div>
                    <strong>
                        <div style={{
                            cursor: "move",
                            background: "#e6739f",
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            color: "white",
                            textAlign: "center",
                            height: 30
                        }}>
                            <div style={{
                                marginLeft: "8px",
                                alignContent: "center",
                                display: "inline-block"
                            }}>
                                <Typography variant="subtitle1"> Фильтр облака точек</Typography>

                            </div>
                            <Tooltip title="Закрыть"
                                     style={{
                                         float: "right"
                                     }}>
                                <label>
                                    <IconButton
                                        component="span"
                                        size="small"
                                        onClick={() => dispatch(closePointCloudFiltersPanel())}
                                        color="primary">
                                        <CloseIcon style={{color: "white"}}/>
                                    </IconButton>
                                </label>
                            </Tooltip>
                        </div>
                    </strong>
                    <div style={{marginLeft: "13px"}}>
                        <div style={{marginTop: 16}}>
                            <TextField
                                id="outlined-number"
                                label="X FROM"
                                type="number"
                                name={"x-from"}
                                step="0.1"
                                value={filter.filterXFromLimit}
                                onChange={event => {
                                    const value = event.target.value;
                                    if (isNumeric(value))
                                        dispatch(changeXFromLimit(value))
                                }}
                                style={{width: 100, height: 20}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-number"
                                label="X TO"
                                type="number"
                                name={"x-to"}
                                step="0.1"
                                value={filter.filterXToLimit}
                                onChange={event => dispatch(changeXToLimit(event.target.value))}
                                style={{width: 100, marginLeft: 24}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="outlined"/>
                        </div>
                        <div style={{marginTop: 12}}>
                            <TextField
                                id="outlined-number"
                                label="Y FROM"
                                type="number"
                                name={"y-from"}
                                step="0.1"
                                value={filter.filterYFromLimit}
                                onChange={event => dispatch(changeYFromLimit(event.target.value))}
                                style={{width: 100, height: 20}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-number"
                                label="Y TO"
                                type="number"
                                name={"y-to"}
                                step="0.1"
                                value={filter.filterYToLimit}
                                onChange={event => dispatch(changeYToLimit(event.target.value))}
                                style={{width: 100, marginLeft: 24}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="outlined"/>
                        </div>
                        <div style={{marginTop: 12}}>
                            <TextField
                                id="outlined-number"
                                label="Z FROM"
                                type="number"
                                name={"z-from"}
                                step="0.1"
                                value={filter.filterZFromLimit}
                                onChange={event => dispatch(changeZFromLimit(event.target.value))}
                                style={{width: 100, height: 20}}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-number"
                                label="Z TO"
                                type="number"
                                name={"z-to"}
                                step="0.1"
                                value={filter.filterZToLimit}
                                onChange={event => dispatch(changeZToLimit(event.target.value))}
                                style={{width: 100, marginLeft: 24}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 0.1
                                }}
                                variant="outlined"/>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default withTheme(PointCloudPanel)