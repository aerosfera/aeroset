import "reflect-metadata";
import EventBus from '../../services/eventBus/EventBus';
import ApiProvider from "../../services/apiProvider/ApiProvider";
import {EventBusService} from "../../services/eventBus/EventBusService";
import {Container} from "inversify";
import {API_PROVIDER_SERVICE, EVENT_BUS_SERVICE, VERSION_SERVICE} from "./ServiceTypes";
import VersionService from "../../services/version/VersionService";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});

IoC.bind<EventBusService>(EVENT_BUS_SERVICE).to(EventBus).inSingletonScope();
IoC.bind<ApiProvider>(API_PROVIDER_SERVICE).to(ApiProvider).inSingletonScope();
IoC.bind<VersionService>(VERSION_SERVICE).to(VersionService).inSingletonScope();

export default IoC;
