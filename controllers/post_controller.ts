import { Request, Response } from "express";
import Blog from "../models/Blog";

export const getPost = async (req: Request, res: Response): Promise<any> => {
  const { postId } = req.params;

  console.log(postId, "postIdpo;stId");

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required " });
  }
  try {
    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post fetched successfully", post });
  } catch (error) {
    console.log(error, "error in getPost");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response): Promise<any> => {
  const { title, description, tags, status, category } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  console.log("description", description, req.body);
  if (!id) {
    return res.status(400).json({ message: "Post ID is required" });
  }
  if (id !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const post = await Blog.create({
      title,
      description,
      author: userId,
      image: req.file?.filename,
      tags,
      status,
      category,
    });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.log(error, "error in createPost");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  const { id, postId } = req.params;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ message: "Post ID is required" });
  }
  if (id !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }
  try {
    const post = await Blog.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.log(error, "error in deletePost");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<any> => {
  const { id, postId } = req.params;
  const userId = req.user.id;
  const { title, description, tags, status, category } = req.body;

  // Validate required parameters
  if (!id) {
    return res
      .status(400)
      .json({ message: "Post ID and User ID are required" });
  }

  // Check authorization
  if (id !== userId) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const existingPost = await Blog.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        tags,
        status,
        category,
        updated: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error in updatePost:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};
