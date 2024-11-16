import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { resetPasswordEmail } from "../utils/emails";

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, bio } = req.body;

  if (!name && !bio) {
    return res.status(400).json({ message: "No data to update" });
  }

  res.status(200).json({ message: "Profile updated successfully" });
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    const user: any = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({
      ...user._doc,
      followers: user.followers.length,
      following: user.following.length,
      password: undefined,
    });
  } catch (error) {
    console.log(error, "error in get user");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfileImage = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const userId = req.user.id;
  if (!id) {
    console.log("id is required");
    return res.status(400).json({ message: "Id is required" });
  }
  if (id !== userId) {
    console.log("unauthorized");
    return res.status(400).json({ message: "Unauthorized" });
  }
  try {
    const user: any = await User.findByIdAndUpdate(userId, {
      $set: { avatar: req.file?.path },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log("profile image updated successfully");
    res.status(200).json({
      message: "Profile image updated successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error, "error in update profile image");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBackgroundImage = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const userId = req.user.id;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  if (id !== userId) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: { backgroundImage: req.file?.path },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Background image updated successfully",
    });
  } catch (error) {
    console.log(error, "error in update background image");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  if (id !== userId) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.log(error, "error in delete profile");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const cryptedPassword = bcrypt.hashSync(newPassword, 10);

    await resetPasswordEmail(email, user.username, cryptedPassword);
  } catch (error) {
    console.log(error, "error in resetPassword");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const confirmResetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { newHashedPassword, id } = req.params;
  const newPassword = req.body.password;
  if (!newHashedPassword) {
    return res.status(400).json({ message: "no new password is provided" });
  }
  const isPasswordValid = await bcrypt.compare(newPassword, newHashedPassword);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: { password: newHashedPassword },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error, "error in confirm reset password");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  updateProfile,
  updateProfileImage,
  updateBackgroundImage,
  getUser,
  deleteProfile,
  resetPassword,
  confirmResetPassword,
};
