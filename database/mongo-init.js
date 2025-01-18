// 切换到或创建数据库
db = db.getSiblingDB("testdb");

// 创建或切换到 orders 集合
db.createCollection("orders");

// 插入一条订单测试数据
db.orders.insertOne({
  userId: ObjectId("64e3cbb176b7b72f001c4fb1"), // 测试用户ID（请确保这是有效的 ObjectId）
  orderId: "ORDER12345", // 测试订单ID
  points: 50, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
});

// 输出日志确认
print("Inserted test order into 'testdb.orders' collection.");
