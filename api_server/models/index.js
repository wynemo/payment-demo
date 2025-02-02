import { Sequelize } from "sequelize";
import User from "./user.js";
import Order from "./order.js";
import sequelize from "../database/sequelize.js";

const models = {
  User: User(sequelize, Sequelize),
  Order: Order,
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export default models;
