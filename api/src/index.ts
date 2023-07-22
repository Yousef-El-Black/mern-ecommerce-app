import express, { Application } from "express";
import { PORT } from "./config";
import { connectDB } from "./utils/connectDB";
import router from "./api";
import cors from "cors";
import { handleUpload, upload } from "./server";

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

// Cloudinary Route
app.post("/api/upload", upload.single("img"), async (req: any, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error,
    });
  }
});

// Listening to Server at PORT
app.listen(port, () => {
  console.log(`Back End Server is Running at PORT: ${port}`);
});
