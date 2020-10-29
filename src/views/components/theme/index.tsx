import {MuiThemeProvider, StylesProvider} from "@material-ui/core";
import React from "react";
import {ThemeProvider} from "styled-components";
import theme from "./theme";

// @ts-ignore
const Theme = ({children}) => (
    <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </MuiThemeProvider>
    </StylesProvider>
);

export default Theme