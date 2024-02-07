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
exports.cli = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
function cli() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const argv = yield (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
                .option('locations', {
                type: 'array',
                description: 'List of locations',
                demandOption: true,
                coerce: arg => (typeof arg === 'string' ? [arg] : arg),
            })
                .option('keyword', {
                type: 'string',
                description: 'Keyword for searching',
                demandOption: true,
                coerce: arg => arg,
            })
                .option('d', {
                type: 'boolean',
                description: 'Get Description or not? (default is False)',
                default: false,
            }).argv;
            return {
                locations: argv.locations,
                keyword: argv.keyword,
                d: argv.d,
            };
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.cli = cli;
//# sourceMappingURL=index.js.map