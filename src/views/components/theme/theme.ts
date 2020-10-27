import {path} from "ramda";

export interface AppTheme {
    colors: {
        main: {
            white: string,
            lightGray: string,
            mediumGray: string,
            darkGray: string,
            lightBlue: string,
            mediumBlue: string
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

const theme: AppTheme = {
    colors: {
        main: {
            white: "#ffffff",
            lightGray: "#e6e6e6",
            mediumGray: "#969696",
            darkGray: "#363835",
            lightBlue: "#bee7f1",
            mediumBlue: "#7dd0e4",
        },
        palette: {
            white: "#ffffff",
            black: "",
            gray: "",
            blue1: {
                dark: "",
                light: "",
                medium: ""
            },
            blue2: {
                dark: "",
                light: "",
                medium: ""
            },
            blue3: {
                dark: "",
                light: "",
                medium: ""
            },
            green: {
                dark: "",
                light: "",
                medium: ""
            },
            orange: {
                dark: "",
                light: "",
                medium: ""
            },
            purple1: {
                dark: "",
                light: "",
                medium: ""
            },
            purple2: {
                dark: "",
                light: "",
                medium: ""
            },
            red: {
                dark: "",
                light: "",
                medium: ""
            },
            yellow: {
                dark: "",
                light: "",
                medium: ""
            }
        }
    },
    font: "Roboto"
};

// @ts-ignore
export const getTheme : string = (keys: any[] = []) =>
// @ts-ignore
    props => path(['theme', ...keys], props);
// @ts-ignore
export const mainColor = key => getTheme(['colors', "main", key]);
// @ts-ignore
export const paletteColor = key => getTheme(['colors', "main", key]);

export default theme;