import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../theme/ThemeColors";
import {appSizes, themeColor} from "../../theme/themeAccessors";

export const HeaderPanelContainer = styled.div<Theme>`
background: ${themeColor(ThemeColors.darkBlue)};
height: ${appSizes("header")}px;
display: flex;
align-items: center;
flex-direction: row-reverse;
padding-left: 16px;
padding-right: 16px;
`
