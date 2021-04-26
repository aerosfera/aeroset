import {createMuiTheme, Theme, ThemeOptions} from "@material-ui/core";
import {defaultAppThemeValues} from "./defaultAppThemeValues";
import {red} from "@material-ui/core/colors";

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        app: {
            colors: {
                main: {
                    white: string,
                    lightGray: string,
                    lightGraySecond: string,
                    mediumGray: string,
                    darkGray: string,
                    lightBlue: string,
                    mediumBlue: string,
                    darkBlue: string,
                    lightGreen: string,
                    red: string,
                }
            },
            font: string,
            sizes: {
                header: number,
                headerMobile: number,
                instrumentalPanel: number,
                footer: number
            },
            lang: string
        }
    }

    interface ThemeOptions {
        app: {
            colors: {
                main: {
                    white: string,
                    lightGray: string,
                    lightGraySecond: string,
                    mediumGray: string,
                    darkGray: string,
                    lightBlue: string,
                    mediumBlue: string,
                    darkBlue: string,
                    lightGreen: string,
                    red: string,
                }
            },
            font: string,
            sizes: {
                header: number,
                headerMobile: number,
                instrumentalPanel: number,
                footer: number
            },
            lang: string
        }
    }
}

export default function createAppTheme(options: ThemeOptions): Theme {
    return createMuiTheme({
        palette: {
            primary: {
                main: "#3A3A3A"
            },
            secondary: {
                main: "#006E81"
            },
            error: {
                main: "#B00020"
            },
        },
        ...defaultAppThemeValues
    })
}
