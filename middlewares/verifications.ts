import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log("decoded", decoded);
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.user = {
      ...(decoded as JwtPayload),
    };
    console.log("req.user", req.user);
    return next();
  } catch (error) {
    console.log("errorss", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
