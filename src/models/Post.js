import { Schema, model } from "mongoose";
import Category from "./Category.js";

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    media: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    tagged: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = new model("Post", postSchema);
export default Post;
