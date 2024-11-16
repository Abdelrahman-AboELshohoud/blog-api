import Blog from "../models/Blog";
import User from "../models/User";
import { Request, Response } from "express";
export const likeBlog = async (req: Request, res: Response): Promise<any> => {
  const { blogId, id } = req.params;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (id !== userId) {
    return res.status(400).json({ message: "User ID does not match" });
  }
  if (!blogId) {
    return res.status(400).json({ message: "Blog ID is required" });
  }
  try {
    const post = await Blog.findById(blogId);
    if (!post) {
      return res.status(400).json({ message: "Blog not found" });
    }
    const user = await User.findByIdAndUpdate(id, {
      $push: { likedBlogs: blogId },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    post.likedTimes += 1;
    await user.save();
    await post.save();
    return res.status(200).json({ message: "Blog liked successfully" });
  } catch (error) {
    console.log(error, "error in likeBlog");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const unlikeBlog = async (req: Request, res: Response): Promise<any> => {
  const { blogId, id } = req.params;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (id !== userId) {
    return res.status(400).json({ message: "User ID does not match" });
  }
  if (!blogId) {
    return res.status(400).json({ message: "Blog ID is required" });
  }
  try {
    const post = await Blog.findById(blogId);

    if (!post) {
      return res.status(400).json({ message: "Blog not found" });
    }
    const user = await User.findByIdAndUpdate(id, {
      $pull: { likedBlogs: blogId },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    post.likedTimes -= 1;
    await user.save();
    await post.save();
    return res.status(200).json({ message: "Blog unliked successfully" });
  } catch (error) {
    console.log(error, "error in unlikeBlog");
    return res.status(500).json({ message: "Internal server error" });
  }
};
