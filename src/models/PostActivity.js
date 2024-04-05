import { Schema, model } from 'mongoose'
import { models } from '../models/index.js'

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
          ref: 'User',
        },
        text: String,
        parentId: Schema.Types.ObjectId,
      },
    ],
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

//todo : business logic
postActivitySchema.pre('findOneAndUpdate', async function (next) {
  let description, user
  const { $addToSet, $inc, $push } = this.getUpdate()
  if ($addToSet && $addToSet.likedBy && $inc.like == 1) {
    user = $addToSet.likedBy
    description = 'Liked a post'
    let existing = await models.Activity.findOne({ userId: user, description })
    if (!existing) {
      await models.Activity.create({
        userId: user,
        postId: this._conditions.postId,
        description,
      })
    }
  } else if ($push && $push.comments) {
    user = $push.comments.commentBy
    description = 'Comment a post'

    await models.Activity.create({
      userId: user,
      postId: this._conditions.postId,
      description,
    })
  }
  next()
})

const PostActivity = new model('PostActivity', postActivitySchema)
export default PostActivity
