import { Request, Response, NextFunction } from "express";
import { NewUser, User } from "../types/user.type";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { JWT_SEC, PEPPER, SALT_ROUNDS } from "../config";
import jwt from "jsonwebtoken";

// Register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt: string = bcrypt.genSaltSync(parseInt(SALT_ROUNDS as string));
    const pepper: string = PEPPER as string;

    const passwordHash: string = bcrypt.hashSync(
      `${req.body.password}${pepper}`,
      salt
    );

    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      isAdmin: req.body.isAdmin || false,
      img: req.body.img,
    });

    const savedUser: NewUser = await newUser.save();

    const { password, ...otherDetails } = savedUser._doc;

    res.status(201).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

// Log In By Username
export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | null = await UserModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      !user && res.status(401).json("Username is not Found!");
    }

    const pepper: string = PEPPER as string;

    const isPasswordValid: boolean = bcrypt.compareSync(
      `${req.body.password}${pepper}`,
      user?.password as string
    );

    !isPasswordValid && res.status(401).json("Password is Wrong!");

    if (user) {
      const jwtSecret: string = JWT_SEC as string;
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        jwtSecret,
        { expiresIn: "3d" }
      );

      const { password, ...otherDetails } = user._doc;

      res.status(200).json({ ...otherDetails, accessToken });
    }
  } catch (err) {
    next(err);
  }
};
