import express from "express";
import { applyAsyncHandlerToRouter } from "../../utils/asyncHandler.js";
import authMiddleware from "../../middleware/auth.js"; // Import the middleware
import { order, capture } from "../../controllers/payment.controller.js";

const router = express.Router();
router.use(authMiddleware); // Add the middleware to the router

// 创建订单的 API
router.post("/pay", order);

// 捕获订单的 API
router.post("/capture/:orderId", capture);

export default applyAsyncHandlerToRouter(router);
