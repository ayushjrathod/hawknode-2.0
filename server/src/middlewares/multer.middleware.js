import multer from "multer";


//The Disk storage engine gives you full controll
//on storing files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/home/ayra/Documents/Documents/Web Development/Projects/hawknode-2.0/server/public/temp"
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const maxSize = 10 * 1024 * 1024; // 10 MB

export const upload = multer({
  storage,
  limits:{fileSize:maxSize},
});
