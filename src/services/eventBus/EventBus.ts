import {EventBusService} from "./EventBusService";
import {EventEmitter2} from "eventemitter2";
import {EventListenerFn} from "./EventListenerFn";
import "reflect-metadata";
import {injectable} from "inversify";

@injectable()
export class EventBus implements EventBusService {
    protected eventEmitter: EventEmitter2 = new EventEmitter2();

    subscribe(event: string, action: EventListenerFn): void {
        this.eventEmitter.on(event, action,);
    }

    unsubscribe(event: string, action: EventListenerFn): void {
        this.eventEmitter.removeListener(event, action);
    }

    send(event: string, ...values: any[]): void {
        this.eventEmitter.emit(event, values);
    }
}