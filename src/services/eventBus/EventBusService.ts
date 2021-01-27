import {EventListenerFn} from "../shared/EventListenerFn";

export interface EventBusService {
    subscribe(event: string, action: EventListenerFn): void;

    unsubscribe(event: string, action: EventListenerFn): void;

    send(event: string, value: any): void;
}
