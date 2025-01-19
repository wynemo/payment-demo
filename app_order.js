import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
import { port, env } from "./api_server/config/app.js";
import apiRouter from "./api_server/routes/order.js";

// 数据库连接配置
const dbConfig = {
  username: "admin",
  password: "adminpw",
  database: "testdb",
  host: "mongodb",
  port: 27017,
};

const mongoUri = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?authSource=admin`;

// 连接 MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
connectDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Say hello
app.get("/", (req, res) =>
  res.status(200).json({ message: "welcome to the payment project!" }),
);

// Routes
app.use("/api/v1", apiRouter);

app.listen(port, () => {
  console.log(`Running on port ${port} in ${env} mode.`);
});
