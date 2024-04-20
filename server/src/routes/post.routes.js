import { Router } from "express";
import {addPost, getPost} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

//secured route
router.route("/create-post").post(
    upload.fields([
        {
            name:"thumbnail",
            maxCount:1,
        },
    ]),
    addPost
);

router.route("/get-posts").get(getPost);

export default router;