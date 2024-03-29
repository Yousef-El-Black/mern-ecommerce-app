import mongoose from "mongoose";
import { ENV, MONGO_URL_ATLAS, MONGO_URL_LOCAL } from "../config";

export const connectDB = async (): Promise<void> => {
  await mongoose
    // .connect(MONGO_URL_ATLAS as string)
    .connect(`${ENV === "dev" ? MONGO_URL_LOCAL : MONGO_URL_ATLAS}` as string)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => console.log(err));
};
