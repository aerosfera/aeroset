import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {path} from "ramda";
import {ThemeColors} from "./ThemeColors";
import createAppTheme from "./createAppTheme";
import {defaultAppThemeValues} from "./defaultAppThemeValues";

const theme: Theme = createAppTheme({
    ...defaultAppThemeValues
})

// @ts-ignore
export const getTheme: string = (keys: any[] = []) =>
// @ts-ignore
    props => path(['theme', 'app', ...keys], props);
// @ts-ignore
export const themeColor = (key: ThemeColors) => getTheme(['colors', "main", ThemeColors[key]]);
// @ts-ignore
export const paletteColor = key => getTheme(['colors', "palette", key]);

export default theme;