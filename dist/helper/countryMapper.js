"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyLogoMapper = void 0;
const delay_1 = require("./delay");
function companyLogoMapper(location) {
    var _a;
    const countryLogo = {
        brasil: "br",
        netherlands: '🇳🇱',
        'united kingdom': '🇬🇧',
        finland: '🇫🇮',
        sweden: '🇸🇪',
        france: '🇫🇷',
        denmark: '🇦🇹',
    };
    const country = location.toLocaleLowerCase().split(',');
    const countryName = country[country.length - 1];
    const logo = (_a = countryLogo[countryName.trim()]) !== null && _a !== void 0 ? _a : '🏳️';
    return `${logo} ${(0, delay_1.capitalizedString)(countryName.trim())}`;
}
exports.companyLogoMapper = companyLogoMapper;
//# sourceMappingURL=countryMapper.js.map