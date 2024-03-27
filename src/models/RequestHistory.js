import { Schema, model } from 'mongoose'
const requestHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    requestStatus: {
      type: String,
      enum: ['approve', 'rejected', 'requested'],
    },

    requestedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    responseByUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)
const RequestHistory = new model('RequestHistory', requestHistorySchema)
export default RequestHistory
