import { Router, IRouter } from "express";
import { verifyAdmin, verifyUser } from "../../middlewares/verifyToken";
import {
  deleteUser,
  getUser,
  getUserStats,
  indexUsers,
  updateUser,
} from "../../controllers/user.controller";

const userRoutes: IRouter = Router();

userRoutes.route("/stats").get(verifyAdmin, getUserStats);

userRoutes
  .route("/:id")
  .get(verifyAdmin, getUser)
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);

userRoutes.route("/").get(verifyAdmin, indexUsers);

export default userRoutes;
