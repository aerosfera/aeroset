import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {appSizes} from "../../theme/themeAccessors";

export const PanelsContainer = styled.div<Theme>`
    position: fixed;
    height: calc(100vh - ${props => appSizes('header')(props) + appSizes('footer')(props) + appSizes('instrumentalPanel')(props)}px);
    background: transparent;
    pointer-events: none;
    left: 0;
    top: 81px;
    right: 0;     
`