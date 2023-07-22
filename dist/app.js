"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
/**
 * Import routes
 */
const index_1 = __importDefault(require("./routes/index"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const app = (0, express_1.default)();
/**
 * Initialize dotenv
 */
(0, dotenv_1.config)();
/**
 * Express configuration (express.json, express.urlencoded, helmet, morgan, cors)
 */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)({
    origin: "*", // Be sure to switch to your production domain
}));
/**
 * Set express variables
 * @param {string} host - Hostname
 * @param {number} port - Port
 */
app.set("host", process.env.HOST || "localhost");
app.set("port", process.env.PORT || 8080);
/**
 * Initialize routes
 */
app.use("/", index_1.default);
app.use("/webhook", webhook_1.default);
exports.default = app;
