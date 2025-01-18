import express from "express";

export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
    this.router = express.Router();

    // 路由配置
    this.router.post("/orders", this.createOrder.bind(this)); // 创建订单
    this.router.get("/orders/:userId", this.getUserOrders.bind(this)); // 获取用户订单列表
  }

  // 创建订单
  async createOrder(req, res) {
    try {
      const orderData = req.body;
      const order = await this.orderService.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 获取用户订单列表
  async getUserOrders(req, res) {
    try {
      const { userId } = req.params;
      const orders = await this.orderService.getUserOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default OrderController;
