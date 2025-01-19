import { OK, BAD_REQUEST } from "../enum/httpCode.js";
import { core, orders, payments } from "@hyperse/paypal-node-sdk";
import OrderService from "../services/order.service.js";

const orderService = new OrderService();

// 配置 PayPal 客户端
const paypalClient = new core.PayPalHttpClient(
  new core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID, // 替换为你的 PayPal 沙盒客户端 ID
    process.env.PAYPAL_CLIENT_SECRET, // 替换为你的 PayPal 沙盒客户端密钥
  ),
);

export const order = async (req, res) => {
  try {
    // 设置订单信息
    const orderRequest = new orders.OrdersCreateRequest();
    console.log(req.body);
    const { value } = req.body;

    // 检查 value 是否为大于 0 的整数
    if (!Number.isInteger(value) || value <= 10) {
      return res.status(400).json({
        error: "Invalid value. It must be a positive integer greater than 10.",
      });
    }
    orderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${value}`,
          },
          description: `Purchase of ${value}Credits`,
        },
      ],
    });

    // 调用 PayPal API 创建订单
    const order = await paypalClient.execute(orderRequest);

    const orderData = {
      userId: req.user.id,
      orderId: order.result.id,
      points: value,
      timestamp: new Date(),
      amount: value,
      status: order.result.status,
    };
    await orderService.createOrder(orderData);

    // 返回订单信息给前端
    res.status(OK).json({
      id: order.result.id, // 订单 ID
      status: order.result.status, // 订单状态
      links: order.result.links, // 包含支付链接
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
};

export const capture = async (req, res) => {
  const { orderId } = req.params;

  try {
    // 捕获订单的请求
    const captureRequest = new orders.OrdersCaptureRequest(orderId);
    captureRequest.requestBody({});

    // 执行捕获
    const capture = await paypalClient.execute(captureRequest);

    const orderData = {
      status: capture.result.status,
    };
    await orderService.updateOrder(orderId, orderData);

    // 返回支付结果
    res.status(OK).json({
      id: capture.result.id,
      status: capture.result.status,
      purchase_units: capture.result.purchase_units,
    });
  } catch (error) {
    console.error("Error capturing order:", error);
    res.status(500).json({ error: "Failed to capture PayPal order" });
  }
};
