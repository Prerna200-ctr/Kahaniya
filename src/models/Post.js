import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      //   sparse: true,
    },
    password: {
      type: String,
    },
    resetToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
