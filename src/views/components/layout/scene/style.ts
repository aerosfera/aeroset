import styled from "styled-components";
import {AppTheme} from "../../theme/theme";

export const Canvas = styled.canvas<AppTheme>`
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