//built in imports
import "dotenv/config";

import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// local imports
import AuthRoute from "./router/auth.js";
import UserRoute from "./router/user.js";
import errorHandler from "./middleware/errorHandler.js";
import "./db/connect.js";

const app = express();

app.use(json());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_BASE_URL as string],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
