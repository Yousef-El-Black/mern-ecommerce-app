"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../../middlewares/verifyToken");
const product_controller_1 = require("../../controllers/product.controller");
const productRoutes = (0, express_1.Router)();
productRoutes
    .route("/:id")
    .get(product_controller_1.getProductById)
    .put(verifyToken_1.verifyAdmin, product_controller_1.updateProduct)
    .delete(verifyToken_1.verifyAdmin, product_controller_1.deleteProduct);
productRoutes.route("/").post(verifyToken_1.verifyAdmin, product_controller_1.createProduct).get(product_controller_1.getAllProducts);
exports.default = productRoutes;
