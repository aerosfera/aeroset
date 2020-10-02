import {Container} from "inversify";
import IocTypes from "./IocTypes";
import IEventBus from "../../services/eventBus/IEventBus";
import EventBus from '../../services/eventBus/EventBus';

const iocContainer = new Container();

iocContainer.bind<EventBus>(IocTypes.EventBus).to(IEventBus).inSingletonScope();

export {iocContainer};