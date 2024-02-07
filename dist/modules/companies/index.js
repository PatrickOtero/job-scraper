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
exports.collectCompanies = void 0;
const relocateMe_1 = require("./relocateMe");
const siaExplains_1 = require("./siaExplains");
function collectCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const companiesData = {
                newCompanies: 0,
                relocateCom: {
                    companies: 0,
                },
                siaExplains: {
                    newCompanies: 0,
                    companies: 0,
                },
            };
            const relocateCom = yield (0, relocateMe_1.relocateMe)();
            if (relocateCom) {
                companiesData.relocateCom.companies = relocateCom.companies;
                companiesData.newCompanies += relocateCom.newCompanies;
            }
            const siaExplainData = yield (0, siaExplains_1.siaExplains)();
            if (siaExplainData) {
                companiesData.siaExplains.companies = siaExplainData.companies;
                companiesData.newCompanies += siaExplainData.newCompanies;
            }
            return companiesData;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.collectCompanies = collectCompanies;
//# sourceMappingURL=index.js.map