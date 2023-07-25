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
exports.countUsersLastMonth = exports.countUsersThisMonth = exports.getUserStats = exports.deleteUser = exports.updateUser = exports.getUser = exports.indexUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
// Get All Users
const indexUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.new;
    try {
        const users = query
            ? yield user_model_1.default.find().sort({ _id: -1 }).limit(5)
            : yield user_model_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.indexUsers = indexUsers;
// Get User By Id
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (user) {
            const _a = user._doc, { password } = _a, otherDetails = __rest(_a, ["password"]);
            res.status(200).json(Object.assign({}, otherDetails));
        }
        else {
            res.status(404).json("User not Found!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUser = getUser;
// Update User By Id
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password) {
            const salt = bcrypt_1.default.genSaltSync(parseInt(config_1.SALT_ROUNDS));
            const pepper = config_1.PEPPER;
            req.body.password = bcrypt_1.default.hashSync(`${req.body.password}${pepper}`, salt);
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateUser = updateUser;
// Delete User By Id
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been Deleted!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteUser = deleteUser;
// Get User Stats
const getUserStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = yield user_model_1.default.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUserStats = getUserStats;
// Count Users of This month
const countUsersThisMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const data = yield user_model_1.default.find({
            createdAt: { $gte: lastMonth },
        }).countDocuments();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.countUsersThisMonth = countUsersThisMonth;
// Count Users of  last Month
const countUsersLastMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const data = yield user_model_1.default.find({
            $and: [
                { createdAt: { $gte: prevMonth } },
                { createdAt: { $lte: lastMonth } },
            ],
        }).countDocuments();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.countUsersLastMonth = countUsersLastMonth;
