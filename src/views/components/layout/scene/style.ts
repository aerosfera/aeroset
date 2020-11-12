import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {appSizes} from "../../theme/themeAccessors";

export const Canvas = styled.canvas<Theme>`
   outline: none;
   display: block;
   margin: 0;
   padding: 0;
   width: 100%;
   ${props => props.theme.breakpoints.up("sm")} {
      height: calc(100vh - ${props => appSizes('header')(props) + appSizes('footer')(props) + appSizes('instrumentalPanel')(props) }px);
   }
   ${props => props.theme.breakpoints.down("sm")} {
      height: calc(100vh - ${props => appSizes('headerMobile')(props)}px);
   }
   touch-action: none;
`