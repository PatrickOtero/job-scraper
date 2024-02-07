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
exports.relocateMe = void 0;
const db_1 = __importDefault(require("../db"));
const driver_1 = require("../driver");
const selenium_webdriver_1 = require("selenium-webdriver");
const relocateMe = () => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield (0, driver_1.createDriver)();
    try {
        yield driver.get('https://relocate.me/companies');
        yield driver.sleep(3000);
        const parentElement = yield driver.findElements(selenium_webdriver_1.By.className('wwbc-companies__link'));
        const companies = [];
        for (const element of parentElement) {
            const childElement = yield element.findElement(selenium_webdriver_1.By.css('span:first-child'));
            const company = yield childElement.getText();
            companies.push(company.toLocaleLowerCase());
        }
        let newCompanies = 0;
        for (const el of companies) {
            const isExist = yield db_1.default.companies.findUnique({
                where: {
                    name: el,
                },
            });
            if (!isExist) {
                newCompanies = newCompanies + 1;
                yield db_1.default.companies.create({ data: { name: el, source: 'relocate.me' } });
            }
        }
        return { newCompanies, companies: companies.length };
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield driver.quit();
    }
});
exports.relocateMe = relocateMe;
//# sourceMappingURL=relocateMe.js.map