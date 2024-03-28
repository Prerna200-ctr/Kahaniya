import { Schema, model } from 'mongoose'
const requestHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    requestStatus: {
      type: String,
      enum: ['accepted', 'requested'],
      default: null,
    },

    requestedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    responseByUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)
const RequestHistory = new model('RequestHistory', requestHistorySchema)
export default RequestHistory
