import { Router, IRouter } from "express";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCartById,
  updateCart,
} from "../../controllers/cart.controller";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../../middlewares/verifyToken";
import { getMonthlyIncome } from "../../controllers/order.controller";

const cartRoutes: IRouter = Router();

cartRoutes
  .route("/:id")
  .put(verifyUser, updateCart)
  .delete(verifyUser, deleteCart)
  .get(verifyUser, getCartById);

cartRoutes
  .route("/")
  .post(verifyToken, createCart)
  .get(verifyAdmin, getAllCarts);

export default cartRoutes;
