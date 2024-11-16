import { Request, Response } from "express";
import User from "../models/User";
export const followUser = async (req: Request, res: Response): Promise<any> => {
  const { id, userIdToFollow } = req.params;
  const userId = req.user.id;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Id and userToFollow are required" });
  }
  if (id !== userId) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findById(id);
    const userToFollow = await User.findById(userIdToFollow);
    if (!user || !userToFollow) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: "User already followed" });
    }
    user.following.push(userToFollow._id);
    userToFollow.followers.push(user._id);
    await user.save();
    await userToFollow.save();
    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.log(error, "error in followUser");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unfollowUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, userIdToUnfollow } = req.params;
  const userId = req.user.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Id and userToUnfollow are required" });
  }

  if (id !== userId) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(id);
    const userToUnfollow = await User.findById(userIdToUnfollow);

    if (!user || !userToUnfollow) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.following.includes(userToUnfollow._id)) {
      return res.status(400).json({ message: "User is not followed" });
    }

    user.following = user.following.filter(
      (id) => id.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== user._id.toString()
    );

    await user.save();
    await userToUnfollow.save();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.log(error, "error in unfollowUser");
    res.status(500).json({ message: "Internal server error" });
  }
};
