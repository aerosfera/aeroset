import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {appSizes} from "../../../theme/themeAccessors";

export const CanvasTopLayerContainer = styled.div<Theme>`
   margin: 0;
   padding: 0;
   width: 100vw;
   touch-action: none;
   ${props => props.theme.breakpoints.up("sm")} {
      height: calc(100vh - ${props => appSizes('header')(props) + appSizes('footer')(props) + appSizes('instrumentalPanel')(props) }px);
   }
   ${props => props.theme.breakpoints.down("sm")} {
      height: calc(100vh - ${props => appSizes('headerMobile')(props)}px);
   }
`