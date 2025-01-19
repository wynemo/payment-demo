import OrderRepository from "../repositories/order.repository.js";

class OrderService {
  constructor(orderRepository = new OrderRepository()) {
    this.orderRepository = orderRepository;
  }

  // 创建订单
  async createOrder(orderData) {
    return this.orderRepository.createOrder(orderData);
  }

  async updateOrder(orderId, orderData) {
    return this.orderRepository.updateOrder(orderId, orderData);
  }

  // 获取用户订单列表
  async getUserOrders(userId, query = {}) {
    return this.orderRepository.getOrdersByUserId(userId, { query: query });
  }
}

export default OrderService;
