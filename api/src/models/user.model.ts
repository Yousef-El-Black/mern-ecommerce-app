import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: { type: String },
    img: { type: String },
    address: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export default model("Users", UserSchema);
