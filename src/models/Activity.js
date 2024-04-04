import { Schema, model } from 'mongoose'
const activitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postId:{
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    description:{
      type: String
    },
    categoryId:{
      type: Schema.Types.ObjectId,
      ref: 'Category',
    }
    // should I store categoryId also to check which category users are following
    // although we can find it from post also
  },
  { timestamps: true }
)

const Activity = new model('Activity', activitySchema)
export default Activity

