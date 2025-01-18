import models from "../models/index.js";
const { Order } = models;

class OrderRepository {
  constructor() {
    this.orderModel = Order;
  }

  // 创建订单
  async createOrder(orderData) {
    return this.orderModel.create(orderData);
  }

  // 获取用户订单列表
  async getOrdersByUserId(userId) {
    return this.orderModel.find({ userId }).sort({ timestamp: -1 }); // 按时间倒序排列
  }

  // 根据订单ID获取订单
  async getOrderById(orderId) {
    return this.orderModel.findOne({ orderId });
  }
}

export default OrderRepository;
