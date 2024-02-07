"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateURL = exports.parsPath = void 0;
const url = require('url');
function parsPath(jobUrl) {
    var _a;
    const pathName = validateURL(jobUrl) ? (_a = url === null || url === void 0 ? void 0 : url.parse(jobUrl)) === null || _a === void 0 ? void 0 : _a.pathname : '';
    return pathName.split('/').pop();
}
exports.parsPath = parsPath;
function validateURL(url) {
    let valid = true;
    try {
        new URL(url);
    }
    catch (error) {
        valid = false;
    }
    finally {
        return valid;
    }
}
exports.validateURL = validateURL;
//# sourceMappingURL=parsPath.js.map