import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: Number, required: true }, // 用户ID
  orderId: { type: String, required: true, unique: true }, // 订单ID
  points: { type: Number, required: true }, // 点数
  timestamp: { type: Date, default: Date.now }, // 时间
  amount: { type: Number, required: true }, // 金额
  status: { type: String, required: true }, // 状态
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
