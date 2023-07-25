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
exports.deleteCart = exports.updateCart = exports.getAllCarts = exports.getCartById = exports.createCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
// Create Cart
const createCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdCart = new cart_model_1.default(req.body);
        const savedCart = yield createdCart.save();
        res.status(201).json(savedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createCart = createCart;
// Get User Cart By Id
const getCartById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_model_1.default.findOne({ userId: req.params.id });
        if (cart) {
            res.status(200).json(cart);
        }
        else {
            res.status(404).json("Cart Not Found!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getCartById = getCartById;
// Get All Carts
const getAllCarts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cart_model_1.default.find();
        res.status(200).json(carts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllCarts = getAllCarts;
// Update Cart
const updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json("Cart has been Updated!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateCart = updateCart;
// Delete Product
const deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been Deleted!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteCart = deleteCart;
