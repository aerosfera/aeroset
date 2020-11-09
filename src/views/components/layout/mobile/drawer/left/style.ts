import styled from "styled-components";
import {Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {themeColor} from "../../../../theme/themeAccessors";
import {ThemeColors} from "../../../../theme/ThemeColors";

export const DrawerContainer = styled.section<Theme>`
width : 250px;
`
export const DrawerHeader = styled.div<Theme>`
display: flex;
justify-content: flex-end;
align-items: center;
padding: ${props => props.theme.spacing(0, 1)};

${props => props.theme.breakpoints.up("sm")} {
      height: 104px;
}
${props => props.theme.breakpoints.down("sm")} {
       height: 56px;
}
`

export const DrawerHeaderTitle = styled(Typography)`
 color: ${themeColor(ThemeColors.darkBlue)};
 margin-right: auto;
 margin-left: 16px;
`