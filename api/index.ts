import express, { Application } from "express";
import { PORT } from "./config";
import { connectDB } from "./utils/connectDB";
import router from "./api";
import cors from "cors";

// Define The Main Router
const app: Application = express();

// Define the Port
const port: number = parseInt(PORT as string) || 8081;

// Connect DB
connectDB();

// Body Parser To Receive JSON Objects
app.use(express.json());

// CORS Middleware
app.use(cors());

// API Route
app.use("/api", router);

// Listening to Server at PORT
app.listen(port, () => {
  console.log(`Back End Server is Running at PORT: ${port}`);
});
