"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../../controllers/cart.controller");
const verifyToken_1 = require("../../middlewares/verifyToken");
const cartRoutes = (0, express_1.Router)();
cartRoutes
    .route("/:id")
    .put(verifyToken_1.verifyUser, cart_controller_1.updateCart)
    .delete(verifyToken_1.verifyUser, cart_controller_1.deleteCart)
    .get(verifyToken_1.verifyUser, cart_controller_1.getCartById);
cartRoutes
    .route("/")
    .post(verifyToken_1.verifyToken, cart_controller_1.createCart)
    .get(verifyToken_1.verifyAdmin, cart_controller_1.getAllCarts);
exports.default = cartRoutes;
