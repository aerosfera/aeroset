import {createMuiTheme, Theme, ThemeOptions} from "@material-ui/core";
import {defaultAppThemeValues} from "./defaultAppThemeValues";

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        app: {
            colors: {
                main: {
                    white: string,
                    lightGray: string,
                    mediumGray: string,
                    darkGray: string,
                    lightBlue: string,
                    mediumBlue: string,
                },
                palette: {
                    black: string,
                    gray: string,
                    white: string,
                    red: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    orange: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    yellow: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    green: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    blue1: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    blue2: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    blue3: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    purple1: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    purple2: {
                        light: string,
                        medium: string,
                        dark: string,
                    }
                }
            },
            font: string
        }
    }

    interface ThemeOptions {
        app: {
            colors: {
                main: {
                    white: string,
                    lightGray: string,
                    mediumGray: string,
                    darkGray: string,
                    lightBlue: string,
                    mediumBlue: string,
                },
                palette: {
                    black: string,
                    gray: string,
                    white: string,
                    red: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    orange: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    yellow: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    green: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    blue1: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    blue2: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    blue3: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    purple1: {
                        light: string,
                        medium: string,
                        dark: string,
                    },
                    purple2: {
                        light: string,
                        medium: string,
                        dark: string,
                    }
                }
            },
            font: string
        }
    }
}

export default function createAppTheme(options: ThemeOptions) : Theme {
    return createMuiTheme({
        ...options,
        ...defaultAppThemeValues
    })
}
