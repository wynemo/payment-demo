// 切换到或创建数据库
db = db.getSiblingDB("testdb");

// 创建或切换到 orders 集合
db.createCollection("orders");

// 插入一条订单测试数据
db.orders.insertOne({
  userId: 1, // 测试用户ID
  orderId: "ORDER12345", // 测试订单ID
  points: 50, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});

// 输出日志确认
print("Inserted test order into 'testdb.orders' collection.");
