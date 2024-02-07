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
exports.scraper = void 0;
const jobCollector_1 = require("./jobCollector");
const filterKeywords_1 = require("./filterKeywords");
const saveJobs_1 = require("./saveJobs");
const scraper = (locations, keyword, isCheckDescription) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const jobs = (_a = (yield (0, jobCollector_1.jobCollector)(locations, keyword))) !== null && _a !== void 0 ? _a : [];
        const filteredJobs = isCheckDescription ? yield (0, filterKeywords_1.filterKeyword)(jobs) : jobs;
        yield (0, saveJobs_1.checkAndSaveJobs)(filteredJobs);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('job done!');
    }
});
exports.scraper = scraper;
//# sourceMappingURL=index.js.map