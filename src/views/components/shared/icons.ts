import styled from "styled-components";
import DialpadIcon from "@material-ui/icons/Dialpad";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import PublishIcon from '@material-ui/icons/Publish';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {themeColor} from "../theme/themeAccessors";
import {ThemeColors} from "../theme/ThemeColors";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {ListItemIcon} from "@material-ui/core";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import MenuIcon from '@material-ui/icons/Menu';
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BlurOffIcon from '@material-ui/icons/BlurOff';

export const OpenPointCloudFiltersIcon = styled(DialpadIcon)`
  color: ${themeColor(ThemeColors.white)}
`
export const ClearPointCloudIcon = styled(BlurOffIcon)`
  color: ${themeColor(ThemeColors.white)}
`
export const AppCloseIcon = styled(CloseIcon)`
  color: ${themeColor(ThemeColors.white)}
`
export const ArrowCloseLeft = styled(ChevronLeftIcon)`
`
export const PointCloudIcon = styled(BlurOnIcon)`
`
export const AppExpandLess = styled(ExpandLess)`
  color: ${themeColor(ThemeColors.darkGray)}
`
export const AppExpandMore = styled(ExpandMore)`
  color: ${themeColor(ThemeColors.darkGray)}
`
export const AppPublishIcon = styled(PublishIcon)`
  ${props => props.theme.breakpoints.down("sm")} {
    color: ${themeColor(ThemeColors.mediumGray)}
  }

  ${props => props.theme.breakpoints.up("sm")} {
    color: ${themeColor(ThemeColors.white)}
  }
`

export const AppListItemIcon = styled(ListItemIcon)`
`

export const AppMenuIcon = styled(MenuIcon)`
  font-size: 35px;
  color: ${themeColor(ThemeColors.white)}
`

export const AppMoreVertIcon = styled(MoreVertIcon)`
  font-size: 35px;
  color: ${themeColor(ThemeColors.white)}
`

export const AppAccountCircleIcon = styled(AccountCircleIcon)`
  font-size: 35px;
  color: ${themeColor(ThemeColors.white)}
`


