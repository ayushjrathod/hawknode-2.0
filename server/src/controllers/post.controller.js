import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Post from "../models/post.models.js";
import { uploadFileOnCloud } from "../utils/fileUpload.js";
import mongoose from "mongoose";

//Creating new Post 
const addPost = asyncHandler(async(req,res)=>{
    const {title,content}= req.body;

    if([title,content].some((field)=>field?.trim() === ""))
        throw new ApiError(400,"All fields are required");

    const thumbnailPath =
      "/home/ayra/Documents/Documents/Web Development/Projects/hawknode-2.0/server/public/temp/sample.avif";
    
    if(!thumbnailPath)
        throw new ApiError(400,"Thumbnail is required");

    const thumbnail = await uploadFileOnCloud(thumbnailPath);

    if(!thumbnail)
        throw new ApiError(400,"Failed to upload thumbnail on cloud");

    //Creating post
    const post = await Post.create(
        {
            title,
            content,
            thumbnail:thumbnail.url,
        }
    );

    const createdPost = await Post.findById(post._id);

    if(!createdPost)
        throw new ApiError(500,"Something went wrong while creaing a post on cloud");

})

const getPost = asyncHandler(async(req,res)=>{
    const posts = await Post.find({})

        return res
          .status(200)
          .json(new ApiResponse(200,posts,"Posts Fetched"));
 
})

const getOnePost = asyncHandler(async(req,res)=>{
    const {postID} = req.params;

    const post = await Post.findById(postID);

    return res
        .status(200)
        .json(new ApiResponse(200,post,"post Fetched"));
})

export {
    addPost,
    getPost,
    getOnePost,
 };