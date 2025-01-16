import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.SITE_DB_USER || "postgres",
    password: process.env.SITE_DB_PASSWORD || "password",
    database: process.env.SITE_DB_DATABASE || "node_app",
    host: process.env.SITE_DB_HOST || "localhost",
    dialect: "mysql",
  },
  test: {
    username: process.env.SITE_DB_USER || "postgres",
    password: process.env.SITE_DB_PASSWORD || "password",
    database: process.env.SITE_DB_DATABASE || "node_app",
    host: process.env.SITE_DB_HOST || "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.SITE_DB_USER || "postgres",
    password: process.env.SITE_DB_PASSWORD || "password",
    database: process.env.SITE_DB_DATABASE || "node_app",
    host: process.env.SITE_DB_HOST || "localhost",
    dialect: "mysql",
  },
};
