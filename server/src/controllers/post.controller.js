import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Post from "../models/post.models.js";
import { uploadFileOnCloud } from "../utils/fileUpload.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//Creating new Post 
const addPost = asyncHandler(async(req,res)=>{
    const {title,content}= req.body;

    if([title,content].some((field)=>field?.trim() === ""))
        throw new ApiError(400,"All fields are required");

    const thumbnailPath =
      "/home/ayra/Documents/Documents/Web Development/Projects/hawknode-2.0/server/public/temp/tempThumbnail.jpg";
    
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

export {addPost};