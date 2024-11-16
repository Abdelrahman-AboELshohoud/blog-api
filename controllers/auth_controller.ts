import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {
  contactEmail,
  resetPasswordEmail,
  welcomeEmail,
} from "../utils/emails";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser: any = new User({
      username,
      email,
      password,
    });

    welcomeEmail(email, username);
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!);
    res.cookie("auth_token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User registered successfully",
      user: newUser._doc ? { ...newUser._doc, password: undefined } : null,
      token,
    });
  } catch (error) {
    console.log(error, "error in register");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.cookie("auth_token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Logged in",
      user: user._doc ? { ...user._doc, password: undefined } : null,
      token,
    });
  } catch (error) {
    console.log(error, "error in login");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  res.cookie("auth_token", "", { maxAge: 0 }).json({ message: "Logged out" });
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.log(error, "error in validateToken");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const contactUs = async (req: Request, res: Response) => {
  const { firstName, lastName, email, subject, message } = req.body;
  await contactEmail(firstName, lastName, email, subject, message);
};
