import { Schema, model } from 'mongoose'
const categorySchema = new Schema(
  {
    categories: {
      type: String,
      enum: ['Crime', 'Love', 'Mystery', 'Thrill', 'Horror', 'Personal development', 'Adult'],
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true }
)
const Category = new model('Category', categorySchema)
export default Category
