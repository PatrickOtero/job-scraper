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
const http = require('http');
const scraper_1 = require("./modules/scraper");
const companies_1 = require("./modules/companies");
const cli_1 = require("./modules/cli");
function runScripts(locations, keyword, description) {
    return __awaiter(this, void 0, void 0, function* () {
        if (locations && keyword) {
            console.log('we are here');
            yield (0, scraper_1.scraper)(locations, keyword, description);
            return;
        }
        const userArgs = yield (0, cli_1.cli)();
        if (userArgs) {
            yield (0, companies_1.collectCompanies)();
            console.log(userArgs);
            yield (0, scraper_1.scraper)(userArgs.locations, userArgs.keyword, userArgs.d);
        }
    });
}
exports.runScripts = runScripts;
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'GET' && req.url === '/start') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'Script ran' }));
        res.end();
        void runScripts(['Brasil'], 'react', false);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found\n');
        res.end();
    }
}));
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map