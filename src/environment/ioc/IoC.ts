import "reflect-metadata";
import ServiceTypes from "./ServiceTypes";
import EventBus from '../../services/eventBus/EventBus';
import ApiProvider from "../../services/apiProvider/ApiProvider";
import {EventBusService} from "../../services/eventBus/EventBusService";
import {Container, decorate, injectable} from "inversify";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});

decorate(injectable(), EventBus);
IoC.bind<EventBusService>(ServiceTypes.EventBusService).to(EventBus).inSingletonScope();

IoC.bind<ApiProvider>(Symbol.for("ApiProviderService")).to(ApiProvider).inSingletonScope();

export default IoC;
