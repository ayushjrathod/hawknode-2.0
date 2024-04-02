import multer from "multer";


//The Disk storage engine gives you full controll
//on storing files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
