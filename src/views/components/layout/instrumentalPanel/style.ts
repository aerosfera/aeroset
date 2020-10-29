import styled from "styled-components";
import {AppTheme, themeColor, ThemeColors} from "../../theme/theme";

export const Panel = styled.div<AppTheme>`
background: ${themeColor(ThemeColors.lightGray)};
height: 100%;
`