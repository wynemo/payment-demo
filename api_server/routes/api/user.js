import express from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
  login,
  profile,
} from "../../controllers/user.controller.js";
import { applyAsyncHandlerToRouter } from "../../utils/asyncHandler.js";
import authMiddleware from "../../middleware/auth.js"; // Import the middleware
import adminRequired from "../../middleware/admin.js"; 
const router = express.Router();

router.post("/login", login);

router.use(authMiddleware); // Add the middleware to the router

router.get("/", adminRequired, index);
router.get("/profile", profile);
router.get("/:id", adminRequired, show);
router.post("/", adminRequired, create);
router.patch("/:id", adminRequired, update);
router.delete("/:id", adminRequired, destroy);

export default applyAsyncHandlerToRouter(router);
