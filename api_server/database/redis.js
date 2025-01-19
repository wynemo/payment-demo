import Redis from "ioredis";

// 创建 Redis 客户端
const redis = new Redis({
  host: "redis", // Redis 服务器地址
  port: 6379, // Redis 端口
  retryStrategy(times) {
    if (times >= 5) {
      // 如果重试次数达到 5 次，停止重连
      console.error("Redis connection failed after 5 attempts.");
      return null; // 返回 null 表示停止重连
    }
    const delay = Math.min(times * 100, 2000); // 每次重连的间隔时间（最大 2 秒）
    console.log(`Retrying Redis connection in ${delay}ms...`);
    return delay;
  },
  reconnectOnError(err) {
    // 判断是否需要重连
    const targetErrors = ["ECONNRESET", "EAI_AGAIN"];
    if (targetErrors.includes(err.code)) {
      console.error("Redis connection error, reconnecting...");
      return true; // 返回 true 表示尝试重连
    }
    return false; // 否则不重连
  },
});

export default redis;
