import Joi from 'joi'

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  media: Joi.string(),
  category: Joi.string().required(),
})
