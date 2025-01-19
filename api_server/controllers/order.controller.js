import express from "express";
import OrderService from "../services/order.service.js";
import OrderValidator from "../validators/order.validator.js";
import redis from "../database/redis.js";

const orderService = new OrderService();
const orderValidator = new OrderValidator();

// 创建订单
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = await orderService.createOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const baseSchema = orderValidator.base();
    const paginationSchema = orderValidator.pagination();
    const orderSchema = orderValidator.order();

    //Validation process
    const validatedQuery = orderValidator.validate(
      [baseSchema, paginationSchema, orderSchema],
      req.query,
    );

    const { id } = req.user;
    const { page, limit } = validatedQuery;
    const cacheKey = `userOrders:${id}:page:${page}:limit:${limit}`;

    // 尝试从 Redis 缓存获取数据
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit:", cacheKey);
      res.status(200).json(JSON.parse(cachedData));
      return;
    }

    const orders = await orderService.getUserOrders(id, validatedQuery);
    await redis.set(cacheKey, JSON.stringify(orders), "EX", 600);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
