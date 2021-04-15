import styled from "styled-components";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import logoEn from '../../../../../assets/images/logo-en.png'

export const LogoContainer = styled.div<Theme>`
  transform: rotate(90deg);
  background-image: url(${logoEn});
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
`