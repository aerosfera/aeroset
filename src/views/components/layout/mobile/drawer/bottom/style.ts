import styled from "styled-components";
import {Theme} from "@material-ui/core";

export const DrawerBottomContainer = styled.section<Theme>`
height : 250px;
`
export const DrawerBottomHeader = styled.div<Theme>`
display: flex;
vertical-align: center;
justify-content: flex-end;
alignItems: 'center';
padding: ${props => props.theme.spacing(0, 1)};
`