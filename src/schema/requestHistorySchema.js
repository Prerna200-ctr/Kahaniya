import Joi from 'joi'
import { ObjectId } from 'mongodb'

export const followRequestSchema = Joi.object({
  requestedUserId: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
  status: Joi.string().valid('requested').required(),
})

export const acceptFollowRequestSchema = Joi.object({
  followerRequestId: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
  status: Joi.string().valid('accepted').required(),
})

export const rejectFollowRequestSchema = Joi.object({
  followerRequestId: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
})

export const removeFollowerSchema = Joi.object({
  followerId: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
})

export const unfollowRequestSchema = Joi.object({
  followerId: Joi.required().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Object Id Validation'),
})

