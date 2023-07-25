"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const connectDB_1 = require("./utils/connectDB");
const api_1 = __importDefault(require("./api"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("./server");
// Define The Main Router
const app = (0, express_1.default)();
// Define the Port
const port = parseInt(config_1.PORT) || 8081;
// Connect DB
(0, connectDB_1.connectDB)();
// Body Parser To Receive JSON Objects
app.use(express_1.default.json());
// CORS Middleware
app.use((0, cors_1.default)());
// API Route
app.use("/api", api_1.default);
// Cloudinary Route
app.post("/api/upload", server_1.upload.single("img"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = yield (0, server_1.handleUpload)(dataURI);
        res.json(cldRes);
    }
    catch (error) {
        console.log(error);
        res.send({
            message: error,
        });
    }
}));
// Listening to Server at PORT
app.listen(port, () => {
    console.log(`Back End Server is Running at PORT: ${port}`);
});
