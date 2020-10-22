import React from "react";
import {ThemeProvider} from "styled-components";

export interface AppTheme {
    colors: {
        header: string,
        instrumentalPanel: string,
        scene: string,
        statePanel: string,
    },
    font: string
}

const theme: AppTheme = {
    colors: {
        header: "#FFFDF9",
        instrumentalPanel: "#06B49A",
        scene: "#AFDBD2",
        statePanel: "#36313D"
    },
    font: "Roboto"
};

// @ts-ignore
const Theme = ({children}) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;