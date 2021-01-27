import {injectable} from "inversify";
import {EventBusService} from "./EventBusService";
import {EventListenerFn} from "../shared/EventListenerFn";
import EventEmitter from "events";

@injectable()
class EventBus implements EventBusService {
    protected eventEmitter: EventEmitter.EventEmitter = new EventEmitter.EventEmitter();

    constructor() {

    }

    subscribe(event: string, action: EventListenerFn): void {
        const functions: Function[] = this.eventEmitter.listeners(event);
        const alreadySubscribed = functions.map(f => f.name).includes(action.name)

        if(!alreadySubscribed)
            this.eventEmitter.addListener(event, action);
    }

    unsubscribe(event: string, action: EventListenerFn): void {
        this.eventEmitter.removeListener(event, action);
    }

    send(event: string, value: any): void {
        this.eventEmitter.emit(event, [value]);
    }
}

export default EventBus