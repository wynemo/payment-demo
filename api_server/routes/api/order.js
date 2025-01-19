import express from "express";
import {
  createOrder,
  getUserOrders,
} from "../../controllers/order.controller.js";
import { applyAsyncHandlerToRouter } from "../../utils/asyncHandler.js";
import authMiddleware from "../../middleware/auth.js"; // Import the middleware

const router = express.Router();
router.use(authMiddleware); // Add the middleware to the router

// router.post("/orders", createOrder); // 创建订单
router.get("/orders/mine", getUserOrders); // 获取用户订单列表

export default applyAsyncHandlerToRouter(router);
