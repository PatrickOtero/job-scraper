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
exports.jobDescriptionClicker = exports.elementGetter = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
function elementGetter({ el, selector, method = 'text', attr = 'href' }) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = '';
        try {
            const element = yield el.findElement(selenium_webdriver_1.By.css(selector));
            name = method == 'text' ? yield element.getText() : yield element.getAttribute(attr);
        }
        catch (_a) {
            name = '';
        }
        finally {
            return name;
        }
    });
}
exports.elementGetter = elementGetter;
function jobDescriptionClicker(el) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const showMoreBtn = yield el.findElement(selenium_webdriver_1.By.className('show-more-less-html__button--more'));
            yield (showMoreBtn === null || showMoreBtn === void 0 ? void 0 : showMoreBtn.click());
        }
        catch (err) {
            console.log("element didn't had description", err);
        }
    });
}
exports.jobDescriptionClicker = jobDescriptionClicker;
//# sourceMappingURL=elements.js.map