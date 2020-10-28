"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const styled_components_1 = require("styled-components");
const createMuiTheme_1 = __importDefault(require("@material-ui/core/styles/createMuiTheme"));
const green_1 = __importDefault(require("@material-ui/core/colors/green"));
const CloudUpload_1 = __importDefault(require("@material-ui/icons/CloudUpload"));
const FilterTiltShift_1 = __importDefault(require("@material-ui/icons/FilterTiltShift"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const ioc_config_1 = require("../../../../environment/ioc/ioc.config");
const ServiceTypes_1 = __importDefault(require("../../../../environment/ioc/ServiceTypes"));
const EventTypes = __importStar(require("../../../../services/eventBus/EventTypes"));
function instrumentalPanel() {
    function loadCloudSystemFile(file) {
        const eventBus = ioc_config_1.iocContainer.get(ServiceTypes_1.default.EventBusService);
        eventBus.send(EventTypes.CLOUD_POINTS_FILE_LOADED.toString(), file);
    }
    ;
    function showCloudSystemFiltersPanel() {
    }
    const redTheme = createMuiTheme_1.default({ palette: { primary: green_1.default } });
    return (<styled_components_1.ThemeProvider theme={redTheme}>
            <div style={{ height: 35, background: "#ef8354" }}>
                <react_1.Fragment>
                    <input color="primary" type="file" onChange={(e) => {
        var _a;
        e.preventDefault();
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        loadCloudSystemFile(file);
    }} id="icon-button-file" style={{ display: 'none', }}/>
                    <Tooltip_1.default title="Загрузить файл с облаком точек" style={{ marginLeft: 5 }}>
                        <label htmlFor="icon-button-file">
                            <IconButton_1.default component="span" size="small" color="primary">
                                <CloudUpload_1.default style={{ color: "white" }}/>
                            </IconButton_1.default>
                        </label>
                    </Tooltip_1.default>
                </react_1.Fragment>
                <Tooltip_1.default title="Открыть панель с фильтрами облака точек">
                    <IconButton_1.default size={"small"} color={"primary"} onClick={showCloudSystemFiltersPanel} style={{ verticalAlign: "bottom", marginLeft: 10 }}>
                        <FilterTiltShift_1.default style={{ color: "white" }}/>
                    </IconButton_1.default>
                </Tooltip_1.default>
            </div>
        </styled_components_1.ThemeProvider>);
}
;
exports.default = instrumentalPanel;
//# sourceMappingURL=InstrumentalPanel.jsx.map