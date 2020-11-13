import styled from "styled-components";
import {Theme} from "@material-ui/core";

export const ProgressContainer = styled.section<{ Theme: Theme, isOpen: boolean }>`
margin-left: 16px;//${props => props.theme.spacing(0, 1)}px;
width: 500px;
visibility: ${props => props.isOpen ? `visible` : `collapse`};
`
