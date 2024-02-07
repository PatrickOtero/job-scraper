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
exports.checkAndSaveJobs = void 0;
const parsPath_1 = require("./parsPath");
const db_1 = __importDefault(require("../db"));
const cleanedText_1 = require("../../helper/cleanedText");
function checkAndSaveJobs(jobs) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = 0;
        try {
            for (const job of jobs) {
                console.log("Apareci antes de salvar");
                const job_name = (0, parsPath_1.parsPath)(job === null || job === void 0 ? void 0 : job.link);
                const existingJob = yield db_1.default.job.findUnique({
                    where: {
                        job_name: job_name,
                    },
                });
                console.log("depois de encontrar os jobs");
                count += 1;
                const response = yield db_1.default.job.create({
                    data: {
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        time: job.time,
                        link: job.link,
                        description: (0, cleanedText_1.cleanedText)(job.description),
                        job_name: job_name,
                    },
                });
                console.log(response);
            }
        }
        catch (e) {
            console.error(`Error saving jobs to database: ${e.message}`);
        }
        finally {
            yield db_1.default.$disconnect();
        }
    });
}
exports.checkAndSaveJobs = checkAndSaveJobs;
//# sourceMappingURL=saveJobs.js.map