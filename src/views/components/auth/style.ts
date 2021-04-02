import styled from "styled-components";
import {Theme} from "@material-ui/core";
import bgImage from '../../../assets/images/mining.jpg'
import logoEn from '../../../assets/images/logo-en.png'

export const AuthFormContainer = styled.div<Theme>`
  width: 100%;
  height: 100%;
`

export const AuthBackground = styled.div<Theme>`
  background-image: url(${bgImage});
  background-position: left center;
  background-repeat: no-repeat;
  filter: blur(2px);
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  left: 0;
  top: 0;
`

export const LogoContainer = styled.div<Theme>`
  transform: rotate(90deg);
  background-image: url(${logoEn});
  background-position: left center;
  background-repeat: no-repeat;
  z-index: -1;
  width: 100px;
  height: 300px;
  position: absolute;
  background-size: cover;
  left: 130px;
  top: -70px;
`

export const SignInContainer = styled.div<Theme>`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

