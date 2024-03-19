import { Schema, model } from "mongoose";

const postActivitySchema = new Schema(
  {
    like: {
      type: Number,
      default: 0,
    },
    share: {
      type: Number,
    },
    comment: [
      {
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comments: [String],
      },
    ],
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const PostActivity = new model("PostActivity", postActivitySchema);
export default PostActivity;
