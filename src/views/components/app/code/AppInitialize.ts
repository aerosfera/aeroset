import IoC from "../../../../environment/ioc/IoC";
import Keyboard from "../../../../services/keyboard/Keyboard";
import {KEYBOARD_SERVICE} from "../../../../environment/ioc/ServiceTypes";

const AppInitialize = () => {
    const keyboardService = IoC.get<Keyboard>(KEYBOARD_SERVICE);
}


export default AppInitialize