import express from "express";
import { applyAsyncHandlerToRouter } from "../../utils/asyncHandler.js";
import OrderController from "../../controllers/order.controller.js";
import OrderService from "../../services/order.service.js";

// router.use(authMiddleware); // Add the middleware to the router

// 使用路由

const orderService = new OrderService();
const orderController = new OrderController(orderService);
const router = orderController.router;

export default applyAsyncHandlerToRouter(router);
