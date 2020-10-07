import "reflect-metadata";

let ServiceTypes = {
    ApiProviderService: Symbol.for("ApiProviderService"),
    EventBusService: Symbol.for("EventBusService")
};

export default ServiceTypes;