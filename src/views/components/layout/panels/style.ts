import styled from "styled-components";
import {Theme} from "@material-ui/core";

export const PanelsContainer = styled.div<Theme>`
    position: fixed;
    height: calc(100vh - 110px);
    background: transparent;
    pointer-events: none;
    left: 0;
    top: 81px;
    right: 0;     
`