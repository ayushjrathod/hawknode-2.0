import { v2 as cloudinary } from "cloudinary";
import fs from "fs";




cloudinary.config({
  cloud_name: process.env.CN_CLOUD_NAME,
  api_key:  process.env.CN_API_KEY,
  api_secret: process.env.CN_API_SECRET
});

const uploadFileOnCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved tenporary file as the upload operation got failed
    return null;
  }
};

export {uploadFileOnCloud};