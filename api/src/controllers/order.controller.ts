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
  const query = req.query.new;
  try {
    let orders;
    if (query) {
      orders = await OrderModel.find({ userId: req.params.id }).limit(5);
    } else {
      orders = await OrderModel.find({ userId: req.params.id });
    }
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
  const query = req.query.new;
  try {
    let orders;
    if (query) {
      orders = await OrderModel.find().sort({ _id: -1 }).limit(5);
    } else {
      orders = await OrderModel.find();
    }
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

// Delete Order
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
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", totalAmount: { $sum: "$sales" } } },
    ]);
    res.status(200).json(income.sort((a, b) => a._id - b._id));
  } catch (err) {
    res.status(500).json(err);
  }
};

// User Orders
export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await OrderModel.aggregate([
      {
        $match: {
          userId: { $eq: req.params.id },
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          amount: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(data.sort((a, b) => a._id - b._id));
  } catch (err) {
    res.status(500).json(err);
  }
};

// Product Stats
export const getProductStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const productId = req.params.id;

    // Use $match to find orders that have the given productId in their products array
    const data = await OrderModel.aggregate([
      {
        $match: {
          "products.productId": { $eq: productId },
          createdAt: { $gte: lastYear },
        },
      },
      {
        $unwind: "$products", // Unwind the products array
      },
      {
        $match: {
          "products.productId": { $eq: productId }, // Match the productId again after unwinding
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          quantity: "$products.quantity", // Include the quantity field in the result
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          totalAmount: { $sum: "$quantity" }, // Calculate the total quantity across all orders
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Count Orders of This month
export const countOrdersThisMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  try {
    const data = await OrderModel.find({
      createdAt: { $gte: lastMonth },
    }).countDocuments();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Count Orders of  last Month
export const countOrdersLastMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await OrderModel.find({
      $and: [
        { createdAt: { $gte: prevMonth } },
        { createdAt: { $lte: lastMonth } },
      ],
    }).countDocuments();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Count Earnings of This month
export const countEarningsThisMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  try {
    const data = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          amount: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json(...data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Count Earnings of  last Month
export const countEarningsLastMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await OrderModel.aggregate([
      {
        $match: {
          $and: [
            { createdAt: { $gte: prevMonth } },
            { createdAt: { $lte: lastMonth } },
          ],
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          amount: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json(...data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Balance
export const getBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await OrderModel.aggregate([
      {
        $project: {
          amount: "$amount",
        },
      },
      {
        $group: {
          _id: "0",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json(...data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const date2 = new Date();
  const date3 = new Date();
  const thisWeek = new Date();
  const thisMonth = new Date();
  const today = new Date();
  const yesterday = new Date(date3.setDate(date3.getDate() - 1));
  const last6Days = new Date(thisWeek.setDate(thisWeek.getDate() - 6));
  const lastWeek = new Date(date.setDate(date.getDate() - 7));
  const lastMonth = new Date(thisMonth.setMonth(thisMonth.getMonth() - 1));
  const lastMonth2 = new Date(date2.setMonth(date2.getMonth() - 1));
  const lastMonthPlus1 = new Date(lastMonth2.setDate(lastMonth2.getDate() - 1));
  try {
    const dataLastWeek = await OrderModel.aggregate([
      {
        $match: {
          $and: [
            { createdAt: { $gte: lastWeek } },
            { createdAt: { $lt: last6Days } },
          ],
        },
      },
      {
        $project: {
          amount: "$amount",
        },
      },
      {
        $group: {
          _id: "lastWeek",
          totalSales: { $sum: "$amount" },
        },
      },
    ]);

    const dataLastMonth = await OrderModel.aggregate([
      {
        $match: {
          $and: [
            { createdAt: { $gte: lastMonth } },
            { createdAt: { $lt: lastMonthPlus1 } },
          ],
        },
      },
      {
        $project: {
          amount: "$amount",
        },
      },
      {
        $group: {
          _id: "lastMonth",
          totalSales: { $sum: "$amount" },
        },
      },
    ]);

    const dataToday = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: yesterday },
        },
      },
      {
        $project: {
          amount: "$amount",
        },
      },
      {
        $group: {
          _id: "today",
          totalSales: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({ dataLastWeek, dataLastMonth, dataToday });
  } catch (err) {
    res.status(500).json(err);
  }
};
