import express from "express";
import payment from "./api/payment.js";
import order from "./api/order.js";

const router = express.Router();

router.use("/payment", payment);
router.use("/order", order);

export default router;
