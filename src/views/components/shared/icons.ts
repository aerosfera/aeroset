import styled from "styled-components";
import DialpadIcon from "@material-ui/icons/Dialpad";
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
import DescriptionIcon from '@material-ui/icons/Description';
import AppsIcon from '@material-ui/icons/Apps';
import TuneIcon from '@material-ui/icons/Tune';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import ErrorIcon from "@material-ui/icons/Error";

export const AppOpenPointCloudFiltersIcon = styled(DialpadIcon)`
  color: ${themeColor(ThemeColors.darkGray)}
`
export const AppSettingsIcon = styled(TuneIcon)`
  color: ${themeColor(ThemeColors.white)}
`

export const AppErrorIcon = styled(ErrorIcon)`
  color: ${themeColor(ThemeColors.darkGray)}
`

export const AppLoadSchemeFile = styled(DescriptionIcon)`
  olor: ${themeColor(ThemeColors.darkGray)}
`
export const AppClearPointCloudIcon = styled(BlurOffIcon)`
  color: ${themeColor(ThemeColors.darkGray)}
`
export const AppCloseIcon = styled(CloseIcon)`
  color: ${themeColor(ThemeColors.white)}
`
export const AppArrowCloseLeft = styled(ChevronLeftIcon)`
`
export const AppPointCloudIcon = styled(BlurOnIcon)`
`

export const AppSchemeIcon = styled(AppsIcon)`
`

export const AppExpandLess = styled(ExpandLess)`
  color: ${themeColor(ThemeColors.darkGray)}
`
export const AppExpandMoreIcon = styled(ExpandMore)`
  color: ${themeColor(ThemeColors.darkGray)}
`

export const AppModelsIcon = styled(InvertColorsIcon)`
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

export const AppUserAccountIcon = styled(AccountCircleIcon)`
  font-size: 35px;
  color: ${themeColor(ThemeColors.white)}
`


