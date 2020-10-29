import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../theme/ThemeColors";
import {themeColor} from "../../theme/themeAccessors";

export const Panel = styled.div<Theme>`
background: ${themeColor(ThemeColors.lightGray)};
height: 100%;
`