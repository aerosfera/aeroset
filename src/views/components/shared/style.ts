import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import {themeColor} from "../theme/themeAccessors";
import {ThemeColors} from "../theme/ThemeColors";
import CloseIcon from "@material-ui/icons/Close";

export const AppDivider = styled(Divider)`
background-color: ${themeColor(ThemeColors.mediumGray)};
`

export const AppDividerLight = styled(Divider)`
background-color: ${themeColor(ThemeColors.lightGray)};
`

export const AppDividerBold = styled(Divider)`
background-color: ${themeColor(ThemeColors.lightGray)};
width: 1.15px;
height: 24px;
margin-left: 8px;
margin-right: 8px;
`

export const AppCloseIcon = styled(CloseIcon)`
color: ${themeColor(ThemeColors.white)};
`
