import models from "../models/index.js";
import formatQuery from "../utils/formatQuery.js";
const { Order } = models;

class OrderRepository {
  constructor() {
    this.orderModel = Order;
  }

  // 创建订单
  async createOrder(orderData) {
    return this.orderModel.create(orderData);
  }

  async updateOrder(orderId, updateData) {
    return this.orderModel.findOneAndUpdate(
      { orderId: orderId }, // 查询条件
      updateData, // 更新的数据
      { new: true }, // 返回更新后的文档
    );
  }

  // 获取用户订单列表，支持分页并返回总记录数
  async getOrdersByUserId(userId, option = {}) {
    // page = 1, limit = 10
    const query = option.query || {};
    const { limit, offset, page } = formatQuery.pagination(query);
    const { order, orderBy } = formatQuery.order(query);

    const skip = (page - 1) * limit; // 计算需要跳过的记录数

    // 并行计算订单列表和总记录数，提升性能
    const [orders, total] = await Promise.all([
      this.orderModel
        .find({ userId }) // 查询条件
        .sort({ timestamp: -1 }) // 按时间倒序排列
        .skip(skip) // 跳过前面的文档
        .limit(limit), // 限制返回的文档数量
      this.orderModel.countDocuments({ userId }), // 计算总记录数
    ]);

    // 返回结果
    return {
      total, // 总记录数
      page, // 当前页码
      limit, // 每页数量
      pages: Math.ceil(total / limit), // 总页数
      data: orders, // 当前页的订单列表
    };
  }

  // 根据订单ID获取订单
  async getOrderById(orderId) {
    return this.orderModel.findOne({ orderId });
  }
}

export default OrderRepository;
