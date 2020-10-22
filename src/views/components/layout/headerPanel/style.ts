import styled from "styled-components";
import {AppTheme} from "../../theme";

const Header = styled.div<AppTheme>`
height: 20px;
background: ${theme => theme.colors.header};
justify-content: "flex-end";
display: "flex";
`
