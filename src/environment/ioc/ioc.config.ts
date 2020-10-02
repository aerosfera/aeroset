import {Container} from "inversify";
import ServiceTypes from "./ServiceTypes";
import IEventBus from "../../services/eventBus/IEventBus";
import EventBus from '../../services/eventBus/EventBus';

const iocContainer = new Container();

iocContainer.bind<IEventBus>(ServiceTypes.EventBus).to(EventBus).inSingletonScope();

export {iocContainer};