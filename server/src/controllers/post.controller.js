import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Post from "../models/post.models.js";
import User from "../models/user.models.js";
import { uploadFileOnCloud } from "../utils/fileUpload.js";

//Creating new Post 
const addPost = asyncHandler(async(req,res)=>{
    const {title,content,tags,createdBy}= req.body;

    if([title,content].some((field)=>field?.trim() === ""))
        throw new ApiError(400,"All fields are required");

    const thumbnailLocalPath = req.file? req.file.path : null;

    if(!thumbnailLocalPath)
        throw new ApiError(400,"Thumbnail is required");

    const thumbnail = await uploadFileOnCloud(thumbnailLocalPath);

    if(!thumbnail)
        throw new ApiError(400,"Failed to upload thumbnail on cloud");

    //Creating post
    const post = await Post.create(
        {
            title,
            content,
            tags,
            thumbnail:thumbnail?.url,
            createdBy,
        }
    );

    const createdPost = await Post.findById(post._id);

    if(!createdPost)
        throw new ApiError(500,"Something went wrong while creaing a post on cloud");

})

//getting all posts
const getPost = asyncHandler(async(req,res)=>{
    const posts = await Post.find({})

        return res
          .status(200)
          .json(new ApiResponse(200,posts,"Posts Fetched"));
 
})

//getting one post
const getOnePost = asyncHandler(async(req,res)=>{
    const {postID} = req.params;

    const post = await Post.findById(postID);

    return res
        .status(200)
        .json(new ApiResponse(200,post,"post Fetched"));
})

//saving post
const savePost = asyncHandler(async(req,res)=>{
    const {postID} = req.params;
    const {userId,isSaved} = req.body;
    
    
    const postIdString = postID.toString();

    if(!postID || !userId || isSaved === undefined)
        throw new ApiError(400,"User and post save data is required");


    const user = await User.findById(userId);
    isSaved ? user.savedPosts.pull(postIdString) : user.savedPosts.push(postIdString);
    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200,"Post saved"));
})
//getting saved posts
const getSavedPosts = asyncHandler(async(req,res)=>{
    const {userId} = req.params;

    if(!userId)
        throw new ApiError(400,"User id is required");

    const user = await User.findById(userId);
    const savedPostsId = user.savedPosts;

    const savedPosts = [];
    for(let i = 0; i < savedPostsId.length; i++){
       let post = await Post.findById(savedPostsId[i]);
         savedPosts.push(post);
     }
    
    return res
        .status(200)
        .json(new ApiResponse(200,savedPosts,"Saved Posts"));
})

//getting my posts
const getMyPosts = asyncHandler(async(req,res)=>{
    const {userId} = req.params;

    if(!userId)
        throw new ApiError(400,"User id is required");

    const posts = await Post.find({createdBy:userId});

    return res
        .status(200)
        .json(new ApiResponse(200,posts,"My Posts"));
})

const editPost = asyncHandler(async(req,res)=>{
    const {postID} = req.params;
    const {title,content} = req.body;

    if(!postID || !title || !content)
        throw new ApiError(400,"No sufficinet data to edit post");

    const post = await Post.findByIdAndUpdate(
        postID,{
            $set:{
                title,
                content
            }
        },
        {new:true}
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200,post,"Post updated"));

});



export {
    addPost,
    getPost,
    getOnePost,
    savePost,
    getSavedPosts,
    getMyPosts,
    editPost,
 };