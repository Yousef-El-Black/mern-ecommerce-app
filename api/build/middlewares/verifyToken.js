"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// Verify Token Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        const jwtSecret = config_1.JWT_SEC;
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, user) => {
            if (err)
                res.status(403).json("Token is not Valid!");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("You're not Authenticated");
    }
};
exports.verifyToken = verifyToken;
// Verify User Middleware
const verifyUser = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You're not Allowed to do that!");
        }
    });
};
exports.verifyUser = verifyUser;
// Verify Admin Middleware
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You're not Allowed to do that!");
        }
    });
};
exports.verifyAdmin = verifyAdmin;
