import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../../theme/ThemeColors";
import {appSizes, themeColor} from "../../../theme/themeAccessors";

export const HeaderMobilePanelContainer = styled.div<Theme>`
background: ${themeColor(ThemeColors.lightGray)};
height: ${appSizes("headerMobile")}px;
flexGrow: 1;
`
