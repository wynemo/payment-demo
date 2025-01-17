import express from "express";
import user from "./api/user.js";
import payment from "./api/payment.js";

const router = express.Router();

router.use("/users", user);
router.use("/payment", payment);

export default router;
