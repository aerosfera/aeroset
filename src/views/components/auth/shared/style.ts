import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {Theme} from "@material-ui/core";

export const TableStyled = styled.div<Theme>`
  display: table;
  height: 100%;
  width: 100%;
`

export const TableRowStyled = styled.div<Theme>`
  display: table-row;
`

export const AerosetLogoContainer = styled.div<Theme>`
  margin-left: 40px;
  margin-top: 32px;
  display: flex;
  align-items: stretch
`

export const SpaceBetween = styled.div<Theme>`
{
  display: flex;
  justify-content: space-between;
  margin-left: 48px;
  margin-right: 48px
}
`