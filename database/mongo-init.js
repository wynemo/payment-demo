// 切换到或创建数据库
db = db.getSiblingDB("testdb");

// 创建或切换到 orders 集合
db.createCollection("orders");

// 插入一条订单测试数据
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER12345", // 测试订单ID
  points: 50, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER123456", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER1234567", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER12345678", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER123456789", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER1234567890", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER12345678901", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER123456789012", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER1234567890123", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER12345678901234", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER123456789012345", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER1234567890123456", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER12345678901234567", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER123456789012345678", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});
db.orders.insertOne({
  userId: 301, // 测试用户ID
  orderId: "ORDER1234567890123456789", // 测试订单ID
  points: 20, // 点数
  timestamp: new Date(), // 当前时间
  amount: 100, // 金额
  status: "created", // 订单状态
});

// 输出日志确认
print("Inserted test order into 'testdb.orders' collection.");
