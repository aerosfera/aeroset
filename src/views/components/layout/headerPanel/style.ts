import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../theme/ThemeColors";
import {themeColor} from "../../theme/themeAccessors";

const Header = styled.div<Theme>`
height: 20px;
background: ${themeColor(ThemeColors.lightGray)};
justify-content: "flex-end";
display: "flex";
`
