import "reflect-metadata";
import EventBus from '../../services/eventBus/EventBus';
import ApiProvider from "../../services/apiProvider/ApiProvider";
import {EventBusService} from "../../services/eventBus/EventBusService";
import {Container} from "inversify";
import {WindowPanelsService} from "../../services/windowPanelsService/WindowPanelsService";
import WindowPanelsProvider from "../../services/windowPanelsService/windowPanels/WindowPanelProvider";
import {API_PROVIDER_SERVICE, EVENT_BUS_SERVICE, WINDOW_PANELS_SERVICE} from "./ServiceTypes";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});

IoC.bind<EventBusService>(EVENT_BUS_SERVICE).to(EventBus).inSingletonScope();
IoC.bind<WindowPanelsService>(WINDOW_PANELS_SERVICE).to(WindowPanelsProvider).inSingletonScope();
IoC.bind<ApiProvider>(API_PROVIDER_SERVICE).to(ApiProvider).inSingletonScope();

export default IoC;
