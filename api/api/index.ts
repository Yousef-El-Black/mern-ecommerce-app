import { Router, IRouter } from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";

const router: IRouter = Router();

// Auth Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/users", userRoutes);

// Products Routes
router.use("/products", productRoutes);

// Carts Routes
router.use("/carts", cartRoutes);

// Orders Routes
router.use("/orders", orderRoutes);

export default router;
