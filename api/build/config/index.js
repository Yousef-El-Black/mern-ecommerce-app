"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_KEY = exports.STRIPE_KEY = exports.PAYPAL_SEC = exports.PAYPAL_CLIENT_ID = exports.JWT_SEC = exports.PEPPER = exports.SALT_ROUNDS = exports.BCRYPT_SEC = exports.MONGO_URL_LOCAL = exports.MONGO_URL_ATLAS = exports.PORT = exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.ENV = _a.ENV, exports.PORT = _a.PORT, exports.MONGO_URL_ATLAS = _a.MONGO_URL_ATLAS, exports.MONGO_URL_LOCAL = _a.MONGO_URL_LOCAL, exports.BCRYPT_SEC = _a.BCRYPT_SEC, exports.SALT_ROUNDS = _a.SALT_ROUNDS, exports.PEPPER = _a.PEPPER, exports.JWT_SEC = _a.JWT_SEC, exports.PAYPAL_CLIENT_ID = _a.PAYPAL_CLIENT_ID, exports.PAYPAL_SEC = _a.PAYPAL_SEC, exports.STRIPE_KEY = _a.STRIPE_KEY, exports.CLOUDINARY_API_KEY = _a.CLOUDINARY_API_KEY, exports.CLOUDINARY_CLOUD_NAME = _a.CLOUDINARY_CLOUD_NAME, exports.CLOUDINARY_API_SECRET = _a.CLOUDINARY_API_SECRET;
