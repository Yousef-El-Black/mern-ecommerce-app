import express, { Application } from "express";
import { PORT } from "./config";

const app: Application = express();

const port = parseInt(PORT as string) || 8081;

app.listen(port, () => {
  console.log(port);
});
