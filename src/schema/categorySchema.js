import Joi from 'joi'
import { ObjectId } from 'mongodb'

export const createCategorySchema = Joi.object({
  categories: Joi.string().required(),
})

export const deleteCategorySchema = Joi.object({
  id: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
})

export const updateCategoryParamsSchema = Joi.object({
  id: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
})

export const followUnfollowCategorySchema = Joi.object({
  categoryName: Joi.string().required(),
  flag: Joi.string().valid('follow', 'unfollow'),
})

export const updateCategoryBodySchema = Joi.object({
  categories: Joi.string().valid(
    'Crime',
    'Love',
    'Mystery',
    'Thrill',
    'Horror',
    'Personal development',
    'Adult'
  ),
})
