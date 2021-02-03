import IoC from "../../infrastructure/ioc/IoC";
import {injectable} from "inversify";
import "reflect-metadata";
import {EventBusService} from "../eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../infrastructure/ioc/ServiceTypes";
import {KEY_PRESSED_EVENT, KEY_UNPRESSED_EVENT} from "../eventBus/EventTypes";

@injectable()
class Keyboard {
    constructor() {
        this.initialize();
    }

    private initialize() {
        document.addEventListener("keydown", this.handleKeyDown, false)
        document.addEventListener("keyup", this.handleKeyUp, false)
    }

    private handleKeyDown(event: any) {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE);
        eventBus.send(KEY_PRESSED_EVENT, event.key)
    }

    private handleKeyUp(event: any) {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE);
        eventBus.send(KEY_UNPRESSED_EVENT, event.key)
    }

}

export default Keyboard