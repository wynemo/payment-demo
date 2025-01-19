import Redis from "ioredis";

// 创建 Redis 客户端
const redis = new Redis({
  host: "redis", // Redis 服务器地址
  port: 6379, // Redis 端口
});

export default redis;
