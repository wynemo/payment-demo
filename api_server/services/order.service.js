import OrderRepository from "../repositories/order.repository.js";
import redis from "../database/redis.js";

class OrderService {
  constructor(orderRepository = new OrderRepository()) {
    this.orderRepository = orderRepository;
  }

  // 创建订单
  async createOrder(orderData) {
    const cacheKeyPattern = `userOrders:${orderData.userId}:*`;
    const keys = await redis.keys(cacheKeyPattern);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log("Cache cleared for user:", orderData.userId);
    }
    return this.orderRepository.createOrder(orderData);
  }

  async updateOrder(orderId, orderData) {
    const cacheKeyPattern = `userOrders:${orderData.userId}:*`;
    const keys = await redis.keys(cacheKeyPattern);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log("Cache cleared for user:", orderData.userId);
    }
    return this.orderRepository.updateOrder(orderId, orderData);
  }

  // 获取用户订单列表
  async getUserOrders(userId, query = {}) {
    return this.orderRepository.getOrdersByUserId(userId, { query: query });
  }
}

export default OrderService;
