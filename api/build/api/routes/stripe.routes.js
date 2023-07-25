"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_controller_1 = require("../../controllers/stripe.controller");
const stripeRoutes = (0, express_1.Router)();
stripeRoutes.route("/payment").post(stripe_controller_1.handleStripe);
exports.default = stripeRoutes;
