import { Router } from "express";
import {addPost, getPost, getOnePost,savePost,getSavedPosts,getMyPosts,editPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

//secured route
router.route("/create-post").post(
    upload.single("thumbnail"),
     (req, res, next) => {
        if (!req.file) {
        console.log(req);
        console.log("No Thumbnail Uploaded.");
        return res.status(400).send("No Thumbnail uploaded.");
        }
        next(); // Proceed to the next middleware (registerUser)
    },
    addPost
);

router.route("/get-posts").get(getPost);
router.route("/:postID").get(getOnePost);
router.route("/save-post/:postID").post(savePost);
router.route("/get-saved-posts/:userId").get(getSavedPosts);
router.route("/get-my-posts/:userId").get(getMyPosts);
router.route("/edit-post/:postID").put(editPost);


export default router;