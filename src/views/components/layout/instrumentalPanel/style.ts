import styled from "styled-components";
import {themeColor} from "../../theme/theme";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../theme/ThemeColors";

export const Panel = styled.div<Theme>`
background: ${themeColor(ThemeColors.lightGray)};
height: 100%;
`