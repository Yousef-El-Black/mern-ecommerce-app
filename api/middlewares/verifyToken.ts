import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SEC } from "../config";

// Verify Token Middleware
export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader: string = req.get("Authorization") as string;
  if (authHeader) {
    const token: string = authHeader.split(" ")[1];
    const jwtSecret: string = JWT_SEC as string;
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) res.status(403).json("Token is not Valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not Authenticated");
  }
};

// Verify User Middleware
export const verifyUser = (req: any, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not Allowed to do that!");
    }
  });
};

// Verify Admin Middleware
export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not Allowed to do that!");
    }
  });
};
