"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../../middlewares/verifyToken");
const user_controller_1 = require("../../controllers/user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.route("/countthismonth").get(verifyToken_1.verifyAdmin, user_controller_1.countUsersThisMonth);
userRoutes.route("/countlastmonth").get(verifyToken_1.verifyAdmin, user_controller_1.countUsersLastMonth);
userRoutes.route("/stats").get(verifyToken_1.verifyAdmin, user_controller_1.getUserStats);
userRoutes
    .route("/:id")
    .get(verifyToken_1.verifyAdmin, user_controller_1.getUser)
    .put(verifyToken_1.verifyUser, user_controller_1.updateUser)
    .delete(verifyToken_1.verifyUser, user_controller_1.deleteUser);
userRoutes.route("/").get(verifyToken_1.verifyAdmin, user_controller_1.indexUsers);
exports.default = userRoutes;
