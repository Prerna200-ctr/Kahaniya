import Joi from 'joi'
import { ObjectId } from 'mongodb'

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  media: Joi.string(),
  category: Joi.string().required(),
})

export const deletePostSchema = Joi.object({
  id: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
})

export const getFeedsSchema = Joi.object({
  category: Joi.string().required(),
})



