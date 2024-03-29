import { MongoGridFSChunkError } from "mongodb";
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,"A title is required"]
  },
  description: {
    type:String
  },
  tags:[String],
  image: {
    type: String //we provide a url of where the image is uploaded
  },
  CreatedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{timestamps: true});

const Posts = mongoose.model("Post", blogSchema);

export default Posts;
