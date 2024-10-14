import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import "dotenv/config";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloud_storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "polo_test",
      // format: "webp",
      public_id: `${file.fieldname}-${crypto.randomUUID().toString()}`,
      transformation: [{ width: 500, height: 500, crop: "fill" }],
    };
  },
});

const uploadCloud = multer({ storage: cloud_storage });
export { uploadCloud };
