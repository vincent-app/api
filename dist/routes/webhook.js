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
const express_1 = __importDefault(require("express"));
const generate_password_1 = __importDefault(require("generate-password"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../database");
const router = express_1.default.Router();
/**
 * @route /
 * @method GET
 * @description Simple route to test the API
 */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check for secret header
        if (!req.headers["x-webhook-secret"]) {
            return res.status(403).json({
                message: "❌ No secret header provided",
            });
        }
        if (req.headers["x-webhook-secret"] !== process.env.WEBHOOK_SECRET) {
            return res.status(403).json({
                message: "❌ Invalid secret header provided",
            });
        }
        /**
         * Check if email already exists
         */
        const userExists = yield database_1.prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (userExists) {
            return res.status(409).json({
                message: "❌ User already exists",
            });
        }
        const firstName = req.body.name.split(" ")[0];
        const lastName = req.body.name.split(" ")[1];
        const email = req.body.email;
        const phoneNum = req.body.phoneNum;
        const address = req.body.address.split("||")[0];
        const city = req.body.address.split("||")[1].split(", ")[0];
        const state = req.body.address.split("||")[1].split(", ")[1];
        const zipCode = req.body.address.split("||")[2];
        const birthday = new Date(req.body.birthday.unix * 1000);
        const householdSize = req.body.householdSize;
        const childrenCount = req.body.childrenCount;
        const householdIncome = req.body.householdIncome;
        const weightLbs = req.body.weightLbs;
        const heightFeet = req.body.heightFeet;
        const heightInches = req.body.heightInches;
        const password = generate_password_1.default.generate({
            length: 32,
            numbers: true,
        });
        const passwordSalt = yield bcrypt_1.default.genSalt(12);
        const passwodHash = yield bcrypt_1.default.hash(password, passwordSalt);
        const user = yield database_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNum,
                address,
                city,
                state,
                zipCode,
                birthday,
                householdSize,
                childrenCount,
                householdIncome,
                weightLbs,
                heightFeet,
                heightInches,
                password: passwodHash,
            },
        });
        res.status(200).json({
            message: "✅ User created",
            user,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}));
exports.default = router;
