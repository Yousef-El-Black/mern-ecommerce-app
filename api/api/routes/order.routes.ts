import { IRouter, Router } from "express";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../../middlewares/verifyToken";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMonthlyIncome,
  getOrderById,
  updateOrder,
} from "../../controllers/order.controller";

const orderRoutes: IRouter = Router();

orderRoutes.route("/income").get(verifyAdmin, getMonthlyIncome);

orderRoutes
  .route("/:id")
  .put(verifyAdmin, updateOrder)
  .delete(verifyAdmin, deleteOrder)
  .get(verifyUser, getOrderById);

orderRoutes
  .route("/")
  .post(verifyToken, createOrder)
  .get(verifyAdmin, getAllOrders);

export default orderRoutes;
