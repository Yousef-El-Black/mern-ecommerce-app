import cloudinary from "cloudinary";
import Multer from "multer";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from "./config";

// Set up our Cloudinary SDK
cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
export async function handleUpload(file: any) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

// Set up the multer middleware
const storage = Multer.memoryStorage();
export const upload = Multer({
  storage,
});
