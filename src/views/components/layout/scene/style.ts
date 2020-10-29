import styled from "styled-components";
import {Theme} from "@material-ui/core";

export const Canvas = styled.canvas<Theme>`
   outline: none;
   display: block;
   margin: 0;
   padding: 0;
   position:fixed;
   left: 0;
   top: 61.5px;
   width: 100%;
   height: 100%;
`