import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {path} from "ramda";
import {ThemeColors} from "./ThemeColors";
import createAppTheme from "./createAppTheme";
import {defaultAppThemeValues} from "./defaultAppThemeValues";

const theme: Theme = createAppTheme({
    ...defaultAppThemeValues
})
export default theme;