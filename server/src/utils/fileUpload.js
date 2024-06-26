import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//setting up cn config
cloudinary.config({
  cloud_name: process.env.CN_CLOUD_NAME,
  api_key:  process.env.CN_API_KEY,
  api_secret: process.env.CN_API_SECRET
});

const uploadFileOnCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload the file to cloudinary.
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("file uploaded successfully to CN", response.url);
    return response;
    
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved tenporary file as the upload operation got failed
    return null;
  }
};

const deleteFileFromCloud = async (publicId) => {
  try {
    if (!publicId) return null;
    //Delete the file from cloudinary.
    const response = await cloudinary.uploader.destroy(publicId);

    console.log("file deleted successfully from CN", response.result);
    return response;
    
  } catch (error) {
    return null;
  }
};

export {uploadFileOnCloud,deleteFileFromCloud};