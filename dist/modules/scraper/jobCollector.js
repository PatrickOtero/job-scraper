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
exports.jobCollector = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const driver_1 = require("../driver");
const elements_1 = require("./elements");
const isExcludedByTitle_1 = require("./isExcludedByTitle");
function jobCollector(locations, keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        const driver = yield (0, driver_1.createDriver)();
        const jobs = [];
        try {
            for (const location of locations) {
                const keywords = encodeURI(keyword);
                yield driver.get(`https://www.linkedin.com/jobs/search?keywords=${keywords}&location=${location}&f_TPR=r86400&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`);
                /*
                  **FOR Getting All Job Element**
                  const jobCount = await driver.findElement(By.className('results-context-header__job-count'))?.getText();
                  Math.ceil(+jobCount)
                  with Select on Show More Button!
                */
                for (let i = 0; i < 4; i++) {
                    // Scroll to the bottom of the page
                    yield driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
                    // Wait for new content to load
                    yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('ul.jobs-search__results-list>li')));
                    // Wait for some additional time to allow the page to fully render
                    yield driver.sleep(3000);
                }
                // Get job listings
                console.log('before listing...');
                const jobElements = yield driver.findElements(selenium_webdriver_1.By.css('ul.jobs-search__results-list>li'));
                console.log(jobElements.length, `count of jobs for ${location}`);
                for (const el of jobElements) {
                    const title = yield (0, elements_1.elementGetter)({ el, selector: 'h3.base-search-card__title' });
                    const company = yield (0, elements_1.elementGetter)({
                        el,
                        selector: '[data-tracking-control-name="public_jobs_jserp-result_job-search-card-subtitle"]',
                    });
                    const location = yield (0, elements_1.elementGetter)({ el, selector: 'span.job-search-card__location' });
                    const time = yield (0, elements_1.elementGetter)({ el, selector: 'time' });
                    const link = yield (0, elements_1.elementGetter)({ el, selector: 'a.base-card__full-link', method: 'attribute', attr: 'href' });
                    if ((0, isExcludedByTitle_1.isExcludedByTitle)(title.toLocaleLowerCase()) && link.length > 1) {
                        jobs.push({
                            title: title.toLocaleLowerCase(),
                            company,
                            location,
                            time,
                            link,
                            visa: false,
                            description: '',
                            source: 'Linkedin',
                        });
                    }
                    else {
                        console.log('filtered by title:', title);
                    }
                }
            }
            return jobs;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            // Close the browser
            yield (driver === null || driver === void 0 ? void 0 : driver.quit());
        }
    });
}
exports.jobCollector = jobCollector;
//# sourceMappingURL=jobCollector.js.map