import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {ThemeColors} from "../theme/ThemeColors";
import {appSizes, themeColor} from "../theme/themeAccessors";

export const Area = styled.main<Theme>`
  ${props => props.theme.breakpoints.up("sm")} {
    height: calc(100vh - ${props => appSizes('header')(props) + appSizes('footer')(props) + appSizes('instrumentalPanel')(props)}px);
  }
   ${props => props.theme.breakpoints.down("sm")} {
   height: calc(100vh - ${props => appSizes('headerMobile')(props)}px);
  }
  background: ${themeColor(ThemeColors.lightBlue)};
`

export const HR = styled.hr<Theme>`
  border: 0; 
  width: 100%;
  margin: 0;
  border-top: 1px solid ${themeColor(ThemeColors.mediumGray)};
  padding: 0; 
`

