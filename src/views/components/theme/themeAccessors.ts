import {path} from "ramda";
import {ThemeColors} from "./ThemeColors";

// @ts-ignore
export const getTheme: string = (keys: any[] = []) =>
// @ts-ignore
    props => path(['theme', 'app', ...keys], props);
// @ts-ignore
export const themeColor = (key: ThemeColors) => getTheme(['colors', "main", ThemeColors[key]]);
// @ts-ignore
export const paletteColor = key => getTheme(['colors', "palette", key]);