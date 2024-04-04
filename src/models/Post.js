import { Schema, model } from 'mongoose'
import {models}  from '../models/index.js'

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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    tagged: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true }
)

postSchema.pre('save', async function (next) {
  await models.PostActivity.create({ userId: this.userId, postId: this._id })

  await models.Activity.create({
    userId: this.userId,
    postId: this._id,
    categoryId: this.categoryId,
    description: 'Created a post',
  })
  next()
})

const Post = new model('Post', postSchema)
export default Post
