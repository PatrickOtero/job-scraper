"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExcludedByTitle = void 0;
function isExcludedByTitle(title) {
    // const keywords = ['junior', 'no visa sponsorship', 'no visasponsorship', 'no visa', 'entry level', 'remote'];
    const keywords = process.env.TITLE_FILTER_KEYWORDS.split(',').map(el => el.trim());
    const forceKeyword = process.env.TITLE_MUST_KEYWORD.split(',').map(el => el.trim());
    return !keywords.some(keyword => title.includes(keyword)) && forceKeyword.some(keyword => title.includes(keyword));
}
exports.isExcludedByTitle = isExcludedByTitle;
//# sourceMappingURL=isExcludedByTitle.js.map