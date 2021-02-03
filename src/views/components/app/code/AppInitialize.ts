import IoC from "../../../../infrastructure/ioc/IoC";
import Keyboard from "../../../../services/keyboard/Keyboard";
import {KEYBOARD_SERVICE} from "../../../../infrastructure/ioc/ServiceTypes";

const AppInitialize = () => {
    const keyboardService = IoC.get<Keyboard>(KEYBOARD_SERVICE);
}


export default AppInitialize