import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDININARY_CLOUD_NAME,
  api_key: process.env.CLOUDININARY_API_KEY,
  api_secret: process.env.CLOUDININARY_API_SECRET,
}); 

export default cloudinary;
  