import express from "express";
import { likeBlog, unlikeBlog } from "../controllers/likes_controller";
import { shareBlog, unshareBlog } from "../controllers/shares_controller";
import { verifyToken } from "../middlewares/verifications";
import { followUser, unfollowUser } from "../controllers/follow_controller";

const router = express.Router();

router.post("/like/:blogId/:id", verifyToken, likeBlog);
router.post("/unlike/:blogId/:id", verifyToken, unlikeBlog);
router.post("/share/:blogId/:id", verifyToken, shareBlog);
router.post("/unshare/:blogId/:id", verifyToken, unshareBlog);
router.post("/follow/:userIdToFollow/:id", verifyToken, followUser);
router.post("/unfollow/:userIdToUnfollow/:id", verifyToken, unfollowUser);

export default router;
