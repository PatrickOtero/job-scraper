"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanedText = void 0;
function cleanedText(text) {
    return text.replace(/(\r\n|\n|\r)/gm, '');
}
exports.cleanedText = cleanedText;
//# sourceMappingURL=cleanedText.js.map