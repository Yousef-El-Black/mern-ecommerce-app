import { Router, IRouter } from "express";
import { handleStripe } from "../../controllers/stripe.controller";

const stripeRoutes: IRouter = Router();

stripeRoutes.route("/payment").post(handleStripe);

export default stripeRoutes;
