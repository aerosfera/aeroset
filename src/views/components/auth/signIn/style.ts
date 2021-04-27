import styled from "styled-components";
import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import theme from "../../theme/theme";
import {themeColor} from "../../theme/themeAccessors";
import {ThemeColors} from "../../theme/ThemeColors";

export const AuthFormContainer = styled.div<Theme>`
  ${props => props.theme.breakpoints.up("sm")} {
    width: 448px;
  }

  ${props => props.theme.breakpoints.down("sm")} {
    width: 448px;
  }
  
  margin: auto auto;
  text-align: center;
  background: #f7f7f7;
  border-radius: 4px;
`

export const SubmitButton = styled(Button)<Theme>`
  width: 200px;
  margin-top: 24px;
  background: ${themeColor(ThemeColors.darkBlue)};
`