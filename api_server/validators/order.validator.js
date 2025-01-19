import models from "../models/index.js";
import Validator from "./validator.js";

const { Order } = models;

class OrderValidator extends Validator {
  constructor() {
    super(Order);
  }

  // create() {
  //   const schema = this.base();

  //   // Add any additional validation rules for the create operation here.
  //   return schema.keys({
  //     first_name: schema.extract("first_name").required(),
  //     last_name: schema.extract("last_name").required(),
  //     email: schema.extract("email").required().email(),
  //     password: schema.extract("password").required(),
  //   });
  // }
}

export default OrderValidator;
