import { Schema, model } from 'mongoose'

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
      ref: 'User',
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isPaid: {
      type: Boolean,
    },
    isFree: {
      type: Boolean,
    },
    tagged: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Post = new model('Post', postSchema)
export default Post
