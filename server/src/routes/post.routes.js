import { Router } from "express";
import {addPost, getPost, getOnePost,savePost,getSavedPosts } from "../controllers/post.controller.js";
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
router.route("/:postID").get(getOnePost);
router.route("/save-post/:postID").post(savePost);
router.route("/get-saved-posts/:userId").get(getSavedPosts);

export default router;