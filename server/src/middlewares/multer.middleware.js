import fs from "fs";
import multer from "multer";
import path from "path";

//Creating absolute path to the temp folder
const tempDir = path.join(process.cwd(), "public", "temp");

// Ensure temp directory exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

//The Disk storage engine gives you full controll
//on storing files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const maxSize = 10 * 1024 * 1024; // 10 MB

export const upload = multer({
  storage,
  limits: { fileSize: maxSize },
});
