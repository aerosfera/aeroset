import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../../theme/ThemeColors";
import {themeColor} from "../../theme/themeAccessors";

export const TypographySignUpStyled = styled.div<Theme>`
  margin-left: 48px;
  margin-right: 48px;
  font-size: 12px;
  color: ${themeColor(ThemeColors.mediumGray)};
`