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
  getUserOrders,
  getProductStats,
  countOrdersThisMonth,
  countOrdersLastMonth,
  countEarningsThisMonth,
  countEarningsLastMonth,
  getBalance,
  getSales,
} from "../../controllers/order.controller";

const orderRoutes: IRouter = Router();

orderRoutes.route("/sales").get(verifyAdmin, getSales);

orderRoutes.route("/balance").get(verifyAdmin, getBalance);

orderRoutes
  .route("/countearningthismonth")
  .get(verifyAdmin, countEarningsThisMonth);

orderRoutes
  .route("/countearninglastmonth")
  .get(verifyAdmin, countEarningsLastMonth);

orderRoutes.route("/countthismonth").get(verifyAdmin, countOrdersThisMonth);

orderRoutes.route("/countlastmonth").get(verifyAdmin, countOrdersLastMonth);

orderRoutes.route("/userstats/:id").get(verifyAdmin, getUserOrders);

orderRoutes.route("/productstats/:id").get(verifyAdmin, getProductStats);

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
