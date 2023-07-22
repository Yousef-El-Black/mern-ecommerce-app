import { Request, Response, NextFunction } from "express";
import CartModel from "../models/cart.model";

// Create Cart
export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdCart = new CartModel(req.body);
    const savedCart = await createdCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get User Cart By Id
export const getCartById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.id });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json("Cart Not Found!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Carts
export const getAllCarts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carts = await CartModel.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Cart
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json("Cart has been Updated!");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Product
export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};
