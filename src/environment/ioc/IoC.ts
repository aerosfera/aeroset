import "reflect-metadata";
import EventBus from '../../services/eventBus/EventBus';
import {EventBusService} from "../../services/eventBus/EventBusService";
import {Container} from "inversify";
import {EVENT_BUS_SERVICE, KEYBOARD_SERVICE, VERSION_SERVICE} from "./ServiceTypes";
import VersionService from "../../services/version/VersionService";
import Keyboard from "../../services/keyboard/Keyboard";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});

IoC.bind<EventBusService>(EVENT_BUS_SERVICE).to(EventBus).inSingletonScope();
IoC.bind<VersionService>(VERSION_SERVICE).to(VersionService).inSingletonScope();
IoC.bind<Keyboard>(KEYBOARD_SERVICE).to(Keyboard).inSingletonScope();

export default IoC;
