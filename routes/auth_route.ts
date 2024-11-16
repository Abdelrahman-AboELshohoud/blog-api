import express from "express";
import {
  login,
  logout,
  register,
  validateToken,
} from "../controllers/auth_controller";
import { verifyToken } from "../middlewares/verifications";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/validate-token", verifyToken, validateToken);

export default router;
