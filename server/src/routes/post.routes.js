import { Router } from "express";
import {addPost} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create-post").post(
    upload.fields([
        {
            name:"thumbnail",
            maxCount:1,
        },
    ]),
    addPost
);

export default router;