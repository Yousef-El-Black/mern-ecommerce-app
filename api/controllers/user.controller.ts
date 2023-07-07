import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { PEPPER, SALT_ROUNDS } from "../config";
import { User } from "../types/user.type";

// Get All Users
export const indexUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query.new;
  try {
    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(5)
      : await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get User By Id
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | null = await UserModel.findById(req.params.id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json({ ...otherDetails });
    } else {
      res.status(404).json("User not Found!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update User By Id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.password) {
      const salt: string = bcrypt.genSaltSync(parseInt(SALT_ROUNDS as string));
      const pepper: string = PEPPER as string;

      req.body.password = bcrypt.hashSync(
        `${req.body.password}${pepper}`,
        salt
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete User By Id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get User Stats
export const getUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
