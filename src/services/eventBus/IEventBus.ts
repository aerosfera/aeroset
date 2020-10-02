export default interface IEventBus {
    subscribe(): void;
    unsubscribe(): void;
}