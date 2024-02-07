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
exports.filterKeyword = void 0;
const driver_1 = require("../driver");
const selenium_webdriver_1 = require("selenium-webdriver");
const db_1 = __importDefault(require("../db"));
const cleanedText_1 = require("../../helper/cleanedText");
const elements_1 = require("./elements");
function filterKeyword(jobs) {
    return __awaiter(this, void 0, void 0, function* () {
        const driver = yield (0, driver_1.createDriver)();
        const jobItems = jobs.filter(job => job.link.length > 1);
        try {
            const filteredJobs = [];
            for (const job of jobItems) {
                console.log('finding keywords ...', job.link);
                yield driver.get(job.link);
                yield (0, elements_1.jobDescriptionClicker)(driver);
                yield driver.sleep(3000);
                const element = yield driver.findElement(selenium_webdriver_1.By.className('core-section-container'));
                const text = "";
                if (element) {
                    const text = yield element.getText();
                }
                else {
                    console.log("Element not found");
                }
                yield driver.sleep(3000);
                const companyName = text.toLocaleLowerCase();
                const haveVisa = (yield db_1.default.companies.findUnique({ where: { name: companyName } })) ||
                    text.toLocaleLowerCase().includes('visa sponsorship');
                job.visa = !!haveVisa;
                job.description = (0, cleanedText_1.cleanedText)(text).substring(0, 300) + '...';
                filteredJobs.push(job);
                const handles = yield driver.getAllWindowHandles();
                for (let i = 1; i < handles.length; i++) {
                    yield driver.switchTo().window(handles[i]);
                    yield driver.close();
                }
                yield driver.switchTo().window(handles[0]);
            }
            return filteredJobs;
        }
        catch (err) {
            console.log(err);
            yield driver.quit();
            throw new Error('filtered broken');
        }
        finally {
            yield (driver === null || driver === void 0 ? void 0 : driver.quit());
        }
    });
}
exports.filterKeyword = filterKeyword;
//# sourceMappingURL=filterKeywords.js.map