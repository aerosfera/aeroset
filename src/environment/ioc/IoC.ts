import "reflect-metadata";
import EventBus from '../../services/eventBus/EventBus';
import ApiProvider from "../../services/apiProvider/ApiProvider";
import {EventBusService} from "../../services/eventBus/EventBusService";
import {Container, decorate, injectable} from "inversify";
import {WindowPanelsService} from "../../services/windowPanelsService/WindowPanelsService";
import WindowPanelsProvider from "../../services/windowPanelsService/windowPanels/WindowPanelProvider";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});

decorate(injectable(), EventBus); //Todo: FIXME
IoC.bind<EventBusService>(Symbol.for("EVENT_BUS_SERVICE")).to(EventBus).inSingletonScope();
IoC.bind<WindowPanelsService>(Symbol.for("WINDOW_PANELS_SERVICE")).to(WindowPanelsProvider).inSingletonScope();
IoC.bind<ApiProvider>(Symbol.for("API_PROVIDER_SERVICE")).to(ApiProvider).inSingletonScope();

export default IoC;
