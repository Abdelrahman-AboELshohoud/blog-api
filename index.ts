import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user_route";
import authRouter from "./routes/auth_route";
import postRouter from "./routes/post_route";
import actionsRouter from "./routes/actions_route";
import postsRouter from "./routes/posts_route";
import searchRouter from "./routes/search_route";
import paymentRouter from "./routes/payments_route";
import "dotenv/config";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err, "error in mongodb");
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(req.headers, "req.headers");
//   next();
// });
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/post", postRouter);
app.use("/api/actions", actionsRouter);
app.use("/api/search", searchRouter);
app.use("/api/payments", paymentRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
});
