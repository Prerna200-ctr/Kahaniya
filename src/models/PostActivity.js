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
    comments: [
      {
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        parentId: Schema.Types.ObjectId, // Identifier of the parent comment or reply
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
