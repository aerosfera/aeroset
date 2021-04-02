import styled from "styled-components";
import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import theme from "../../theme/theme";
import {themeColor} from "../../theme/themeAccessors";
import {ThemeColors} from "../../theme/ThemeColors";

export const SignInFormContainer = styled.div<Theme>`
  max-width: 300px;
  margin: auto auto;
  text-align: center;
  background: #f7f7f7;
  border-radius: 10px;
  padding-top: 10px;
`

export const SubmitButton = styled(Button)<Theme>`
  width: 200px;
  margin-top: 24px;
  background: ${themeColor(ThemeColors.darkBlue)};
`