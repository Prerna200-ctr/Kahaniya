import { Schema, model } from 'mongoose'
const blockedSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    blockedUser: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Block = new model('Block', blockedSchema)
export default Block
