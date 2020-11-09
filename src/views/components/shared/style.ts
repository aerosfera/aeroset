import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import {themeColor} from "../theme/themeAccessors";
import {ThemeColors} from "../theme/ThemeColors";
import CloseIcon from "@material-ui/icons/Close";

export const AppDivider = styled(Divider)`
background-color: ${themeColor(ThemeColors.darkGray)};
max-height: 1px;
`
export const AppCloseIcon = styled(CloseIcon)`
color: ${themeColor(ThemeColors.white)};
`
