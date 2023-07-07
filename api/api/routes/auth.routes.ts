import { Router, IRouter } from "express";
import { logIn, register } from "../../controllers/auth.controller";

const authRoutes: IRouter = Router();

// Register
authRoutes.post("/register", register);

// Log in
authRoutes.post("/login", logIn);

export default authRoutes;
