"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const authRoutes = (0, express_1.Router)();
// Register
authRoutes.post("/register", auth_controller_1.register);
// Log in
authRoutes.post("/login", auth_controller_1.logIn);
exports.default = authRoutes;
