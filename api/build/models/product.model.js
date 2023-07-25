"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: [String] },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Products", ProductSchema);
