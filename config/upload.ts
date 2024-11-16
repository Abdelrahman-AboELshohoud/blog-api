import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";

dotenv.config();

// Configure Cloudinary with environment variables
const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: Request, file: Express.Multer.File) => ({
    folder: "uploads",
    allowedFormats: ["png", "jpg", "jpeg", "webp"],
  }),
});

export { cloudinary, storage };
