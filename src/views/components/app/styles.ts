import styled from "styled-components";
import theme, {AppTheme, themeColor, ThemeColors} from "../theme/theme";

export const Container = styled.div`
   background: #282c34;
   display: flex;
   flex-direction: column;
   height: 100%;
   min-height: 100%;
`
export const HeaderContainer = styled.header<AppTheme>`
  min-height: 62px;
  width: 100%;
  position: fixed;
  left: 0;
  top:0;
`
export const Header = styled.div<AppTheme>`
  min-height: 36px;
  width: 100%;
  background: ${themeColor(ThemeColors.lightGray)};
`
export const HR = styled.hr<AppTheme>`
  border: 0; 
  width: 100%;
  margin: 0;
  border-top: 1px solid ${themeColor(ThemeColors.mediumGray)};
  padding: 0; 
`
export const Panel = styled.header<AppTheme>`
  min-height: 24px;
  width: 100%;
  background: ${themeColor(ThemeColors.lightGray)};
`
export const Footer = styled.footer<AppTheme>`
  min-height: 24px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom:0;
  background: ${themeColor(ThemeColors.lightGray)};
`
export const Area = styled.main<AppTheme>`
  min-height: 100%;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background: ${themeColor(ThemeColors.lightBlue)};
`


