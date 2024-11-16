import express, { Request, Response } from "express";
import multer from "multer";
import { storage } from "../config/upload";
import { verifyToken } from "../middlewares/verifications";
import {
  confirmResetPassword,
  deleteProfile,
  resetPassword,
  updateProfile,
  updateProfileImage,
  getUser,
} from "../controllers/user_controller";

const router = express.Router();
const upload = multer({ storage: storage });

router.post(
  "/update-avatar/:id",
  verifyToken,
  upload.single("image"),
  updateProfileImage
);

router.post("/update-profile/:id", verifyToken, updateProfile);
router.delete("/delete-profile/:id", verifyToken, deleteProfile);

router.get("/get-user/:id", verifyToken, getUser);

router.post("/reset-password/:id", verifyToken, resetPassword);
router.post(
  "/confirm-reset-password/:newHashedPassword/:id",
  confirmResetPassword
);

export default router;
