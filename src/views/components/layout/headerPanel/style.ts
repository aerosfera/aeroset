import styled from "styled-components";
import {AppTheme} from "../../theme/theme";

const Header = styled.div<AppTheme>`
height: 20px;
background: ${theme => theme.colors.main.lightGray};
justify-content: "flex-end";
display: "flex";
`
