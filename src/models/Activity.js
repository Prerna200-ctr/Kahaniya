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
    }
  },
  { timestamps: true }
)

const Activity = new model('Activity', activitySchema)
export default Activity

