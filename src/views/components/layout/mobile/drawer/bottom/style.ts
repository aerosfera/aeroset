import styled from "styled-components";
import {Theme} from "@material-ui/core";

export const DrawerBottomContainer = styled.section<Theme>`
height : 270px;
align-content: center;
`
export const DrawerBottomHeader = styled.div<Theme>`
display: flex;
vertical-align: center;
justify-content: flex-end;
align-items: center;
padding: ${props => props.theme.spacing(0, 1)};
`

export const MobilePanelContainer = styled.div<Theme>`
visibility: ${props => {
    // @ts-ignore
    return (props.currentType && props.stateType && props.currentType.valueOf() === props.stateType.valueOf()) ? `visible` : `collapse`;
}};

`