import dotenv from "dotenv";

dotenv.config();

export const {
  ENV,
  PORT,
  MONGO_URL_ATLAS,
  MONGO_URL_LOCAL,
  BCRYPT_SEC,
  SALT_ROUNDS,
  PEPPER,
  JWT_SEC,
  PAYPAL_CLIENT_ID,
  PAYPAL_SEC,
} = process.env;
