import styled from "styled-components";
import {Theme} from "@material-ui/core";

export const Panels = styled.div<Theme>`
    position: fixed;
    height: 100%;
    width: 100%;
    background: transparent;
    pointer-events: none;
    left: 0;
    top: 61.5px;
    right: 0;
    bottom: 24px;
`