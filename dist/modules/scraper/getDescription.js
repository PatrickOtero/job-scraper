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
exports.scrapDescription = exports.getDescription = void 0;
const cleanedText_1 = require("../../helper/cleanedText");
const driver_1 = require("../driver");
const elements_1 = require("./elements");
const selenium_webdriver_1 = require("selenium-webdriver");
const db_1 = __importDefault(require("../db"));
function getDescription(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const job = yield db_1.default.job.findUnique({
                where: {
                    id,
                },
            });
            if (!job) {
                console.log(`Job ${id} is not exist in db`);
                return null;
            }
            if (job.description) {
                return job.description;
            }
            const description = yield scrapDescription(job.link);
            const updatedJob = yield db_1.default.job.update({
                where: { id },
                data: {
                    description,
                },
            });
            return updatedJob === null || updatedJob === void 0 ? void 0 : updatedJob.description;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getDescription = getDescription;
function scrapDescription(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const driver = yield (0, driver_1.createDriver)();
        try {
            yield driver.get(link);
            yield (0, elements_1.jobDescriptionClicker)(driver);
            yield driver.sleep(5000);
            const element = yield driver.findElement(selenium_webdriver_1.By.className('core-section-container'));
            const text = yield element.getText();
            const editedText = (0, cleanedText_1.cleanedText)(text).substring(0, 3500);
            return editedText;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            driver === null || driver === void 0 ? void 0 : driver.quit();
        }
    });
}
exports.scrapDescription = scrapDescription;
//# sourceMappingURL=getDescription.js.map