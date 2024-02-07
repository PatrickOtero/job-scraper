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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScripts = void 0;
require('dotenv').config();
const scraper_1 = require("./modules/scraper");
const companies_1 = require("./modules/companies");
const cli_1 = require("./modules/cli");
function runScripts() {
    return __awaiter(this, void 0, void 0, function* () {
        const userArgs = yield (0, cli_1.cli)();
        if (userArgs) {
            yield (0, companies_1.collectCompanies)();
            yield (0, scraper_1.scraper)(userArgs.locations, userArgs.keyword, userArgs.d);
        }
    });
}
exports.runScripts = runScripts;
void runScripts();
//# sourceMappingURL=index.js.map