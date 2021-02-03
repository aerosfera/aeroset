import IoC from "../../infrastructure/ioc/IoC";
import {EventBusService} from "../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../infrastructure/ioc/ServiceTypes";
import {SHOW_BACKDROP_EVENT} from "../../services/eventBus/EventTypes";
import i18next from "i18next";

export const sendMessage = (messageType: string,message?: string) => {
    const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
    eventBus.send(messageType, message)
}