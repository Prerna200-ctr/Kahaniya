import Joi from 'joi'

export const createCategorySchema = Joi.object({
  categories: Joi.string().required(),
})
