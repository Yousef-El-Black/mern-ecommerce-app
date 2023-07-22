import { Response, Request } from "express";
import { STRIPE_KEY } from "../config";
const stripe = require("stripe")(STRIPE_KEY);

export const handleStripe = async (req: Request, res: Response) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr: any, stripeRes: any) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};
