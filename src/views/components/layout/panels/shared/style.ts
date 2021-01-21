import styled from "styled-components";
import {Theme} from "@material-ui/core";
import {themeColor} from "../../../theme/themeAccessors";
import {ThemeColors} from "../../../theme/ThemeColors";
import Typography from "@material-ui/core/Typography";

export const PanelContainer = styled.section<{ theme: Theme, width: number, height: number, isActive: number }>`
 width: ${props => props.width}px;
 height: ${props => props.height}px;
 background: ${themeColor(ThemeColors.lightGray)};
 border-radius: 5px;
 pointer-events: auto;
 visibility: ${props => props.isActive ? `visible` : `hidden`};
`

export const PanelHeaderContainer = styled.strong<Theme>`
`

export const PanelMobileContainer = styled.div<Theme>`
width: 100%;
display: flex;
justify-content: center
`

export const PanelHeader = styled.div<Theme>`
cursor: move;
background: ${themeColor(ThemeColors.darkBlue)};
border-top-left-radius: 5px;
border-top-right-radius: 5px;
color: ${themeColor(ThemeColors.white)};
text-align: center;
height: 30px;
`

export const PanelHeaderText = styled.div<Theme>`
margin-left: 8px;
align-content: center;
display: inline-block;
`

export const PanelHeaderTypography = styled(Typography)`
`

export const PanelBodyContainer = styled.div<Theme>`
margin: 16px;
`