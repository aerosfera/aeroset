import "reflect-metadata";
import EventBus from '../../services/eventBus/EventBus';
import {EventBusService} from "../../services/eventBus/EventBusService";
import {Container} from "inversify";
import {
    COLOR_GRADIENT_SERVICE,
    EVENT_BUS_SERVICE,
    INFRASTRUCTURE_SERVICE,
    KEYBOARD_SERVICE,
    VERSION_SERVICE
} from "./ServiceTypes";
import VersionService from "../../services/version/VersionService";
import Keyboard from "../../services/keyboard/Keyboard";
import ColorGradientService from "../../services/colorGradient/GradientService";
import InfrastructureService from "../../services/infrastructure/infrastructureService";

const IoC = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
    skipBaseClassChecks: true
});

IoC.bind<EventBusService>(EVENT_BUS_SERVICE).to(EventBus).inSingletonScope();
IoC.bind<VersionService>(VERSION_SERVICE).to(VersionService).inSingletonScope();
IoC.bind<Keyboard>(KEYBOARD_SERVICE).to(Keyboard).inSingletonScope();
IoC.bind<ColorGradientService>(COLOR_GRADIENT_SERVICE).to(ColorGradientService).inSingletonScope();
IoC.bind<InfrastructureService>(INFRASTRUCTURE_SERVICE).to(InfrastructureService).inSingletonScope();

export default IoC;