import styled from "styled-components";
import {Theme} from "@material-ui/core";
import bgImage from '../../../assets/images/authBg.jpg'

export const AuthFormContainer = styled.div<Theme>`
  //width: 100%;
  //height: 100%;
  width: 100vw;
  height: 100vh;
`
export const AuthBackground = styled.div<Theme>`
  background-image: url(${bgImage});
  background-position: left center;
  background-repeat: no-repeat;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  left: 0;
  top: 0;
`

export const SignInContainer = styled.div<Theme>`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

