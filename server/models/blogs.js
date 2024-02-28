import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  img:{
    data:Binary,
    type:String
  },
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Posts = mongoose.model("Post", blogSchema);

export default Posts;
