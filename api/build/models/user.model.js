"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    phone: { type: String },
    img: { type: String },
    address: { type: String },
    country: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Users", UserSchema);
