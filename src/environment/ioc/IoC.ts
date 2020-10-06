/// <reference path="../../services/eventBus/EventBusService.ts" />

import {Container} from "inversify";
import {ServiceTypes} from "./ServiceTypes";
import {EventBus} from '../../services/eventBus/EventBus';
import {EventBusService} from "../../services/eventBus/EventBusService";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});
IoC.bind<EventBusService>(ServiceTypes.EventBusService).to(EventBus);

export default IoC;
