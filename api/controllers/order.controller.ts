import { Request, Response, NextFunction } from "express";
import OrderModel from "../models/order.model";

// Create Order
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdOrder = new OrderModel(req.body);
    const savedOrder = await createdOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get User Orders By Id
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find({ userId: req.params.id });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json("Orders Not Found!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Orders
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Order
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json("Order has been Updated!");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Product
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Monthly Income
export const getMonthlyIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
