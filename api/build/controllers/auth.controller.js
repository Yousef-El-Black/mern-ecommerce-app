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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = bcrypt_1.default.genSaltSync(parseInt(config_1.SALT_ROUNDS));
        const pepper = config_1.PEPPER;
        const passwordHash = bcrypt_1.default.hashSync(`${req.body.password}${pepper}`, salt);
        const newUser = new user_model_1.default({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            country: req.body.country,
            isAdmin: req.body.isAdmin || false,
            img: req.body.img,
        });
        const savedUser = yield newUser.save();
        const _a = savedUser._doc, { password } = _a, otherDetails = __rest(_a, ["password"]);
        res.status(201).json(Object.assign({}, otherDetails));
    }
    catch (err) {
        next(err);
    }
});
exports.register = register;
// Log In By Username
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            username: req.body.username,
        });
        if (!user) {
            !user && res.status(401).json("Username is not Found!");
        }
        const pepper = config_1.PEPPER;
        const isPasswordValid = bcrypt_1.default.compareSync(`${req.body.password}${pepper}`, user === null || user === void 0 ? void 0 : user.password);
        !isPasswordValid && res.status(401).json("Password is Wrong!");
        if (user) {
            const jwtSecret = config_1.JWT_SEC;
            const accessToken = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: "3d" });
            const _b = user._doc, { password } = _b, otherDetails = __rest(_b, ["password"]);
            res.status(200).json(Object.assign(Object.assign({}, otherDetails), { accessToken }));
        }
    }
    catch (err) {
        next(err);
    }
});
exports.logIn = logIn;
