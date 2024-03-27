import { Schema, model } from 'mongoose'

const followingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    status: {
      type: String,
      enum: ['approve', 'reject'],
      default: 'reader',
    },
    
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

const Following = new model('Following', followingSchema)
export default Following