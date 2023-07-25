"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSales = exports.getBalance = exports.countEarningsLastMonth = exports.countEarningsThisMonth = exports.countOrdersLastMonth = exports.countOrdersThisMonth = exports.getProductStats = exports.getUserOrders = exports.getMonthlyIncome = exports.deleteOrder = exports.updateOrder = exports.getAllOrders = exports.getOrderById = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
// Create Order
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdOrder = new order_model_1.default(req.body);
        const savedOrder = yield createdOrder.save();
        res.status(201).json(savedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createOrder = createOrder;
// Get User Orders By Id
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.new;
    try {
        let orders;
        if (query) {
            orders = yield order_model_1.default.find({ userId: req.params.id }).limit(5);
        }
        else {
            orders = yield order_model_1.default.find({ userId: req.params.id });
        }
        if (orders) {
            res.status(200).json(orders);
        }
        else {
            res.status(404).json("Orders Not Found!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getOrderById = getOrderById;
// Get All Orders
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.new;
    try {
        let orders;
        if (query) {
            orders = yield order_model_1.default.find().sort({ _id: -1 }).limit(5);
        }
        else {
            orders = yield order_model_1.default.find();
        }
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllOrders = getAllOrders;
// Update Order
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json("Order has been Updated!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateOrder = updateOrder;
// Delete Order
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been Deleted!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteOrder = deleteOrder;
// Get Monthly Income
const getMonthlyIncome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = yield order_model_1.default.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
            { $group: { _id: "$month", totalAmount: { $sum: "$sales" } } },
        ]);
        res.status(200).json(income.sort((a, b) => a._id - b._id));
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getMonthlyIncome = getMonthlyIncome;
// User Orders
const getUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = yield order_model_1.default.aggregate([
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUserOrders = getUserOrders;
// Product Stats
const getProductStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const productId = req.params.id;
        // Use $match to find orders that have the given productId in their products array
        const data = yield order_model_1.default.aggregate([
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
                    "products.productId": { $eq: productId },
                    createdAt: { $gte: lastYear },
                },
            },
            {
                $project: {
                    quantity: "$products.quantity",
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getProductStats = getProductStats;
// Count Orders of This month
const countOrdersThisMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const data = yield order_model_1.default.find({
            createdAt: { $gte: lastMonth },
        }).countDocuments();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.countOrdersThisMonth = countOrdersThisMonth;
// Count Orders of  last Month
const countOrdersLastMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const data = yield order_model_1.default.find({
            $and: [
                { createdAt: { $gte: prevMonth } },
                { createdAt: { $lte: lastMonth } },
            ],
        }).countDocuments();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.countOrdersLastMonth = countOrdersLastMonth;
// Count Earnings of This month
const countEarningsThisMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const data = yield order_model_1.default.aggregate([
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.countEarningsThisMonth = countEarningsThisMonth;
// Count Earnings of  last Month
const countEarningsLastMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const data = yield order_model_1.default.aggregate([
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.countEarningsLastMonth = countEarningsLastMonth;
// Get Balance
const getBalance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const data = yield order_model_1.default.aggregate([
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getBalance = getBalance;
const getSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const dataLastWeek = yield order_model_1.default.aggregate([
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
        const dataLastMonth = yield order_model_1.default.aggregate([
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
        const dataToday = yield order_model_1.default.aggregate([
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getSales = getSales;
