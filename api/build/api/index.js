"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const stripe_routes_1 = __importDefault(require("./routes/stripe.routes"));
const router = (0, express_1.Router)();
// Auth Routes
router.use("/auth", auth_routes_1.default);
// User Routes
router.use("/users", user_routes_1.default);
// Products Routes
router.use("/products", product_routes_1.default);
// Carts Routes
router.use("/carts", cart_routes_1.default);
// Orders Routes
router.use("/orders", order_routes_1.default);
// Stripe Routes
router.use("/checkout", stripe_routes_1.default);
exports.default = router;
