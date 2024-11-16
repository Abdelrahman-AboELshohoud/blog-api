import Blog from "../models/Blog";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error, "error in getPosts");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyPosts = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user.id;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  console.log(id, userId);
  if (id !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const posts = await Blog.find({ author: userId });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error, "error in getMyPosts");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const posts = await Blog.find({ author: id });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error, "error in getUserPosts");
    res.status(500).json({ message: "Internal server error" });
  }
};
