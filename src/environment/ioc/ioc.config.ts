import {Container} from "inversify";
import EventBus from "../../services/eventBus/eventBus";
import IOC from "./IOC";
import {IEventBus} from "../../services/eventBus/IEventBus";

const iocContainer = new Container();
iocContainer.bind<EventBus>(IOC.EventBus).to(IEventBus).inSingletonScope();
export { iocContainer };