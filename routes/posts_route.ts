import express from "express";
import { verifyToken } from "../middlewares/verifications";
import {
  getPosts,
  getMyPosts,
  getUserPosts,
} from "../controllers/posts_controller";

const router = express.Router();

router.get("/get-posts", getPosts);

router.get("/get-my-posts/:id", verifyToken, getMyPosts);

router.get("/get-user-posts/:id", verifyToken, getUserPosts);

export default router;
