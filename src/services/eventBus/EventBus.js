"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter2_1 = require("eventemitter2");
class EventBus {
    constructor() {
        EventBus.eventEmitter = new eventemitter2_1.EventEmitter2();
    }
    subscribe(event, action) {
        EventBus.eventEmitter.on(event, action);
    }
    unsubscribe(event, action) {
        EventBus.eventEmitter.removeListener(event, action);
    }
    send(event, ...values) {
        EventBus.eventEmitter.emit(event, values);
    }
}
exports.default = EventBus;
//# sourceMappingURL=EventBus.js.map