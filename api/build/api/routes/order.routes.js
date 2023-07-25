"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../../middlewares/verifyToken");
const order_controller_1 = require("../../controllers/order.controller");
const orderRoutes = (0, express_1.Router)();
orderRoutes.route("/sales").get(verifyToken_1.verifyAdmin, order_controller_1.getSales);
orderRoutes.route("/balance").get(verifyToken_1.verifyAdmin, order_controller_1.getBalance);
orderRoutes
    .route("/countearningthismonth")
    .get(verifyToken_1.verifyAdmin, order_controller_1.countEarningsThisMonth);
orderRoutes
    .route("/countearninglastmonth")
    .get(verifyToken_1.verifyAdmin, order_controller_1.countEarningsLastMonth);
orderRoutes.route("/countthismonth").get(verifyToken_1.verifyAdmin, order_controller_1.countOrdersThisMonth);
orderRoutes.route("/countlastmonth").get(verifyToken_1.verifyAdmin, order_controller_1.countOrdersLastMonth);
orderRoutes.route("/userstats/:id").get(verifyToken_1.verifyAdmin, order_controller_1.getUserOrders);
orderRoutes.route("/productstats/:id").get(verifyToken_1.verifyAdmin, order_controller_1.getProductStats);
orderRoutes.route("/income").get(verifyToken_1.verifyAdmin, order_controller_1.getMonthlyIncome);
orderRoutes
    .route("/:id")
    .put(verifyToken_1.verifyAdmin, order_controller_1.updateOrder)
    .delete(verifyToken_1.verifyAdmin, order_controller_1.deleteOrder)
    .get(verifyToken_1.verifyUser, order_controller_1.getOrderById);
orderRoutes
    .route("/")
    .post(verifyToken_1.verifyToken, order_controller_1.createOrder)
    .get(verifyToken_1.verifyAdmin, order_controller_1.getAllOrders);
exports.default = orderRoutes;
