import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../theme/ThemeColors";
import {appSizes, themeColor} from "../../theme/themeAccessors";

export const FooterContainer = styled.div<Theme>`
background: ${themeColor(ThemeColors.mediumGray)};
height: ${appSizes("footer")}px;
display: flex;
flex-direction: row;
align-items: center;
`