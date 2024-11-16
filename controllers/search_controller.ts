import Blog from "../models/Blog";
import { Request, Response } from "express";

export const search = async (req: Request, res: Response) => {
  const { title, description, author, tags, category } = req.query;

  const query: any = {};

  if (title) query.title = { $regex: title, $options: "i" };
  if (description) query.description = { $regex: description, $options: "i" };
  if (author) query.author = { $regex: author, $options: "i" };
  if (tags) query.tags = { $in: tags };
  if (category) query.category = { $in: category };
  try {
    const blogs = await Blog.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
