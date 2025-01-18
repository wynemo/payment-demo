import { core, orders, payments } from "@hyperse/paypal-node-sdk";

// 配置 PayPal 客户端
const paypalClient = new core.PayPalHttpClient(
  new core.SandboxEnvironment(
    process.env.paypal_client_id, // 替换为你的 PayPal 沙盒客户端 ID
    process.env.paypal_client_secret, // 替换为你的 PayPal 沙盒客户端密钥
  ),
);

export const order = async (req, res) => {
  try {
    // 设置订单信息
    const orderRequest = new orders.OrdersCreateRequest();
    console.log(req.body);
    const { value } = req.body;
    orderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${value}`,
          },
          description: "Purchase of 50 Credits",
        },
      ],
    });

    // 调用 PayPal API 创建订单
    const order = await paypalClient.execute(orderRequest);

    // 返回订单信息给前端
    res.status(200).json({
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

    // 返回支付结果
    res.status(200).json({
      id: capture.result.id,
      status: capture.result.status,
      purchase_units: capture.result.purchase_units,
    });
  } catch (error) {
    console.error("Error capturing order:", error);
    res.status(500).json({ error: "Failed to capture PayPal order" });
  }
};
