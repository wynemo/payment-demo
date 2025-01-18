import Sequelize from "sequelize";
import dbConfig from "../config/database.js";
import process from "process";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  // Rest of the code...

  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    timezone: "+08:00",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      match: [
        /SequelizeConnectionError/, // 连接错误
        /SequelizeConnectionRefusedError/, // 连接被拒绝
        /SequelizeHostNotFoundError/, // 主机未找到
        /SequelizeHostNotReachableError/, // 主机不可达
        /SequelizeInvalidConnectionError/, // 无效连接
        /SequelizeConnectionTimedOutError/, // 连接超时
      ],
      max: 5, // 最大重试次数
    },
  },
);

export default sequelize;
