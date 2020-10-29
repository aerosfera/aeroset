import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {themeColor} from "../../theme/theme";
import {ThemeColors} from "../../theme/ThemeColors";

const Header = styled.div<Theme>`
height: 20px;
background: ${themeColor(ThemeColors.lightGray)};
justify-content: "flex-end";
display: "flex";
`
