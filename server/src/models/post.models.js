import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type:String,
    required:true,
  },
  thumbnail: {
    type: String //we provide a url of where the image is uploaded
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{timestamps: true});

const Post = mongoose.model("Post", blogSchema);

export default Post;
