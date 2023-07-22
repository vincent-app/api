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
const consola_1 = require("consola");
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("./app"));
/**
 * Load Prsima Client and connect to Prisma Server if failed to connect, throw error.
 */
const prisma = new client_1.PrismaClient();
prisma
    .$connect()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    app_1.default.listen(app_1.default.get("port"), () => {
        /**
         *  Log infomation after everything is started.
         */
        if (process.env.NODE_ENV !== "test") {
            consola_1.consola.log("----------------------------------------");
            consola_1.consola.info(`Environment: ${app_1.default.get("env")}`);
            consola_1.consola.info(`App URL: http://${app_1.default.get("host")}:${app_1.default.get("port")}`);
            consola_1.consola.info(`Prisma: Connected`);
            consola_1.consola.log("----------------------------------------");
        }
    });
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    process.exit(1);
}));
