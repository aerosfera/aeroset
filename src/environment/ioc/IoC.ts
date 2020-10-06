import ServiceTypes from "./ServiceTypes";
import {Container} from "inversify";
import {EventBus} from '../../services/eventBus/EventBus';
import {EventBusService} from "../../services/eventBus/EventBusService";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});
IoC.bind<EventBusService>(ServiceTypes.EventBusService).to(EventBus).inSingletonScope();

export default IoC;
