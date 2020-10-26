import styled from "styled-components";
import {AppTheme, getMainColor} from "../theme/theme";

export const Container =styled.div`
   background: #282c34;
   display: flex;
   flex-direction: column;
`
export const Header = styled.header<AppTheme>`
  min-height: 24px;
  width: 100%;
  flex: none;
  background: ${props => props.theme.colors.main.lightGray};`

export const HR = styled.hr<AppTheme>`
  border: 0; 
  width: 100%;
  flex: none;
  border-top: 1px solid #282c34;
  padding: 0; 
`
export const Panel = styled.header<AppTheme>`
  min-height: 24px;
  width: 100%;
  flex: none;
  background: ${props => props.theme.colors.main.lightGray};
`

export const Footer = styled.footer<AppTheme>`
  min-height: 24px;
  width: 100%;
  flex: none;
  background: ${props => props.theme.colors.main.lightGray};
`
export const Area = styled.main<AppTheme>`
  min-height: 100%;
  width: 100%;
  flex: auto;
  background: ${props => props.theme.colors.main.lightBlue};
`


