import express from "express";
import { verifyToken } from "../middlewares/verifications";
import {
  createPost,
  deletePost,
  updatePost,
  getPost,
} from "../controllers/post_controller";
import multer from "multer";
import { storage } from "../config/upload";

const router = express.Router();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.post(
  "/create-post/:id",
  verifyToken,
  upload.single("image"),
  createPost
);

router.delete("/delete-post/:postId/:id", verifyToken, deletePost);

router.put(
  "/update-post/:postId/:id",
  verifyToken,
  upload.single("image"),
  updatePost
);

router.get("/get-post/:postId/:id", getPost);

export default router;
