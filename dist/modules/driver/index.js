"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriver = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const edge_1 = __importDefault(require("selenium-webdriver/edge"));
function createDriver() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = new edge_1.default.Options();
        options.addArguments('--headless=new');
        options.addArguments('--ignore-ssl-errors=yes');
        options.addArguments('--ignore-certificate-errors');
        options.addArguments('--enable-chrome-browser-cloud-management');
        return new selenium_webdriver_1.Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
    });
}
exports.createDriver = createDriver;
//# sourceMappingURL=index.js.map