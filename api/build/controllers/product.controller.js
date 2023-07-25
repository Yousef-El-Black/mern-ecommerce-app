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
exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.getProductById = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
// Create Product
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdProduct = new product_model_1.default(req.body);
        const savedProduct = yield createdProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createProduct = createProduct;
// Get Product By Id
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json("Product Not Found!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getProductById = getProductById;
// Get All Products
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        let products;
        if (qNew) {
            products = yield product_model_1.default.find().sort({ createdAt: -1 }).limit(5);
        }
        else if (qCategory) {
            products = yield product_model_1.default.find({
                categories: { $in: [qCategory] },
            });
        }
        else {
            products = yield product_model_1.default.find();
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllProducts = getAllProducts;
// Update Product
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json("Product has been Updated!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateProduct = updateProduct;
// Delete Product
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been Deleted!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteProduct = deleteProduct;
