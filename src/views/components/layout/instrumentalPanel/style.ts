import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../theme/ThemeColors";
import {appSizes, themeColor} from "../../theme/themeAccessors";

export const Panel = styled.div<Theme>`
background: ${themeColor(ThemeColors.mediumGray)};
height: ${appSizes("instrumentalPanel")}px;
display: flex;
flex-direction: row;
align-items: center;
padding-left: 16px;
padding-right: 16px;
`