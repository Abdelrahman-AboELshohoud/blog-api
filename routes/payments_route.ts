import { Router } from "express";
import { createOrder, captureOrder } from "../controllers/payments_controller";
import { verifyToken } from "../middlewares/verifications";
const router = Router();

router.post("/create-order/:id", verifyToken, createOrder);
router.post("/capture-order/:id", verifyToken, captureOrder);

export default router;
