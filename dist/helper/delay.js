"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizedString = exports.delay = void 0;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
function capitalizedString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalizedString = capitalizedString;
//# sourceMappingURL=delay.js.map