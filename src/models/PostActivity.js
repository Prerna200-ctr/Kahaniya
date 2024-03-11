import { Schema, model } from 'mongoose'

const postActivitySchema = new Schema(
  {
    like: {
      type: Number,
      default: 0,
    },
    share: {
      type: Number,
    },
    comments: {
      type: [String],
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true }
)

const PostActivity = new model('PostActivity', postActivitySchema)
export default PostActivity
